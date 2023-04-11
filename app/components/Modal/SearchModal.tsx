"use client";

import React from "react";
import Modal from "@/app/components/Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, {
  CountySelectValue,
} from "@/app/components/forms/CountrySelect";
import qs from "query-string";
import formatISO from "date-fns/formatISO";
import Heading from "@/app/components/Heading";
import Calendar from "@/app/components/forms/Calendar";
import Counter from "@/app/components/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const PROPERTY_INFO = {
  roomCount: 1,
  guestCount: 1,
  bathroomCount: 1,
};

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const [step, setStep] = React.useState<number>(STEPS.LOCATION);
  const [propertyInfo, setPropertyInfo] =
    React.useState<typeof PROPERTY_INFO>(PROPERTY_INFO);
  const [dateRange, setDateRange] = React.useState<Range>(initialDateRange);
  const [location, setLocation] = React.useState<CountySelectValue>();

  const Map = React.useMemo(
    () =>
      dynamic(() => import("@/app/components/forms/Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = React.useCallback(() => {
    if (step !== 0) {
      setStep((prevState) => prevState - 1);
    }
  }, []);

  const onNext = React.useCallback(() => {
    setStep((prevState) => prevState + 1);
  }, []);

  const onSubmit = React.useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      ...propertyInfo,
      locationValue: location?.value,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [step, searchModal, location, propertyInfo, dateRange, onNext, params]);

  const actionLabel = React.useMemo(() => {
    if (step === STEPS.INFO) {
      return "Seach";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = React.useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div
      className="
      flex
      flex-col
      gap-8
      "
    >
      <Heading
        title="Where do you want to go?"
        subtitle="Find the perfect location"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div
        className="
        flex flex-col gap-8
        "
      >
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everything is free"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More Information" subtitle="Find your perfect place" />
        <Counter
          title="Guests"
          subtitle="How many guests are coming"
          value={propertyInfo.guestCount}
          onChange={(value) =>
            setPropertyInfo((prevState) => ({
              ...prevState,
              guestCount: value,
            }))
          }
        />

        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={propertyInfo.roomCount}
          onChange={(value) =>
            setPropertyInfo((prevState) => ({
              ...prevState,
              roomCount: value,
            }))
          }
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={propertyInfo.bathroomCount}
          onChange={(value) =>
            setPropertyInfo((prevState) => ({
              ...prevState,
              bathroomCount: value,
            }))
          }
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    ></Modal>
  );
};

export default SearchModal;
