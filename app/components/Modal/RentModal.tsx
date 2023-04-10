"use client";

import React from "react";
import Modal from "@/app/components/Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "@/app/components/Heading";
import { CATEGORIES, CategoryType } from "@/app/components/Navbar/Category";

import CategoryInput from "@/app/components/forms/CategoryInput";
import CountrySelect from "@/app/components/forms/CountrySelect";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Counter from "@/app/components/Counter";
import ImageUpload from "@/app/components/ImageUpload";
import Input from "@/app/components/forms/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export const RentModal = (props: {}) => {
  const [step, setStep] = React.useState<number>(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: "",
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = React.useMemo(
    () =>
      dynamic(() => import("@/app/components/forms/Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    if (step !== 0) {
      setStep((prevState) => prevState - 1);
    }
  };

  const onNext = () => {
    setStep((prevState) => prevState + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/v1/listings", data)
      .then(() => {
        toast.success("Listing Created");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong!");
        console.log("error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = React.useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Submit";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = React.useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
        "
      >
        {CATEGORIES.map((item: CategoryType, index: number) => (
          <div
            key={index}
            className="
            col-span-1
            "
          >
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div
        className="
      flex 
      flex-col 
      gap-8
      "
      >
        <Heading
          title="Wlocationhere is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          value={guestCount}
          title="Guests"
          subtitle="How many guests"
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms?"
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms?"
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show Guests what your place looks like"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you descript your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          register={register}
          id="title"
          label="Title"
          disabled={isLoading}
          errors={errors}
          required
        />
        <hr />

        <Input
          register={register}
          id="description"
          label="Description"
          disabled={isLoading}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div
        className="
        flex flex-col gap-8
        "
      >
        <Heading
          title="Now set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          errors={errors}
          register={register}
        />
      </div>
    );
  }

  const rentModal = useRentModal();
  return (
    <Modal
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={rentModal.isOpen}
      title="AirBnB Your Home"
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;
