import { useGetShopCardVariants } from "@/api/services/shopServices";
import AppButton from "@/components/AppButton";
import BingoCard from "@/components/BingoCard";
import BingoCardsSkeleton from "@/components/BingoCardSkeleton";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { MdAdd, MdCheck } from "react-icons/md";
import VariantOptions from "../VariantOptions";

const CardVariants = ({ shop }) => {
  const [selectedVariant, setSelectedVariant] = useState();

  const {
    data: cardVariantResponse,
    isLoading,
    error,
  } = useGetShopCardVariants(shop);

  const cardVariants = cardVariantResponse?.data?.data?.clusters || [];

  useEffect(() => {
    setSelectedVariant(cardVariants[0]);
  }, [cardVariants]);

  if (isLoading && !selectedVariant) {
    return (
      <div className="w-screen md:w-[65svw] h-[70svh]">
        <BingoCardsSkeleton />
      </div>
    );
  }

  return (
    <div>
      <TabGroup className="h-[80svh] overflow-auto " vertical>
        <TabList className="border-b-2 border-primary mb-1 sticky top-0 bg-white z-10 flex justify-between items-center">
          <div className="flex gap-1">
            {cardVariants.map((variant) => (
              <div
                key={variant._id}
                className={`flex mb-2 px-2  rounded-md   ${
                  variant._id === selectedVariant?._id
                    ? " bg-primary/20 hover:bg-primary/25"
                    : "hover:bg-primary/10"
                }`}
              >
                <Tab
                  onClick={() => setSelectedVariant(variant)}
                  className="capitalize text-nowrap rounded-lg py-1 text-sm/6 font-semibold text-primary  "
                >
                  <div className="flex items-center gap-1.5">
                    {variant.shopRelations?.[0]?.isActive && <MdCheck />}
                    <p>{variant.name}</p>
                  </div>
                </Tab>
                <VariantOptions variant={variant} />
              </div>
            ))}

            <AppButton dense disabled className={"mb-2"}>
              <MdAdd />
            </AppButton>
          </div>
          <span className="px-4 text-primary font-bold text-sm text-nowrap">
            Cards
          </span>
        </TabList>
        <TabPanels>
          {cardVariants.map((variant) => (
            <TabPanel key={variant._id}>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {selectedVariant?.shopCards?.map((card, index) => (
                  <BingoCard key={card?.id} card={card} fullScreen />
                ))}
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default CardVariants;
