import {
  useBingoCards,
  useRegenerateBingoCards,
} from "@/api/services/gameServices";
import AppButton from "@/components/AppButton";
import AppDialog from "@/components/AppDialog";
import AppInput from "@/components/AppInput";
import BingoCard from "@/components/Bingo/BingoCard";
import BingoCardSkeleton from "@/components/Bingo/BingoCardSkeleton";
import { ERROR } from "@/constants/toast";
import useToast from "@/hooks/useToast";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";

const BingoCards = () => {
  const { showMessage } = useToast();
  const [labelFilter, setLabelFilter] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const { data: bingoCards, isLoading, error } = useBingoCards();
  const {
    mutate: regenerateCards,
    isPending,
    error: regenerationError,
  } = useRegenerateBingoCards();

  const handleRegenerateCards = () => {
    regenerateCards(
      { count: 100 },
      {
        onSuccess: () => {
          showMessage(`Card regenerated successfully.`);

          setIsDialogOpen(false);
        },
        onError: (error) => {
          showMessage(`Failed to regenerate cards.`, { type: ERROR });
          setIsDialogOpen(false);
        },
      }
    );
  };

  const cards = bingoCards?.data?.data?.bingoCards || [];
  if (isLoading) {
    return <BingoCardSkeleton />;
  }

  const filteredCards = cards.filter((card) => {
    const cardLabel = card?.label || "";
    return cardLabel.toString().includes(labelFilter);
  });

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setLabelFilter(value);
  };

  return (
    <div>
      <div className="flex justify-between items-center py-3 gap-2">
        <div className="flex gap-1">
          <div className="bg-secondary p-3.5 h-full flex items-center justify-center rounded-lg">
            <MdSearch />
          </div>
          <AppInput
            value={labelFilter}
            onChange={handleFilterChange}
            placeholder="Search by card label"
            type="number"
          />
        </div>
        <AppButton onClick={toggleDialog}>Regenerate</AppButton>
      </div>

      <div className="printable grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCards.map((card, index) => (
          <BingoCard fullScreen key={card?.id} card={card} />
        ))}
      </div>

      <AppDialog
        title="Confirm"
        description={`Are you sure you want to regenerate bingo cards?`}
        open={isDialogOpen}
        onClose={toggleDialog}
        onConfirm={handleRegenerateCards}
        isLoading={isPending}
        confirmButtonLabel="Regenerate"
      />
    </div>
  );
};

export default BingoCards;
