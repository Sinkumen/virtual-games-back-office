export const getFormattedValues = (setting, settingIdentifier) => {
  switch (settingIdentifier) {
    case "walletSettings":
      return [
        {
          label: "Min Deposit",
          value: `${setting?.depositAmount?.minDeposit} Birr`,
          formValue: setting?.depositAmount?.minDeposit,
          name: "minDeposit",
        },
        {
          label: "Max Deposit",
          value: `${setting?.depositAmount?.maxDeposit} Birr`,
          formValue: setting?.depositAmount?.maxDeposit,
          name: "maxDeposit",
        },
        {
          label: "Min Withdrawal",
          value: `${setting?.withdrawalAmount?.minWithdrawal} Birr`,
          formValue: setting?.withdrawalAmount?.minWithdrawal,
          name: "minWithdrawal",
        },
        {
          label: "Max Withdrawal",
          value: `${setting?.withdrawalAmount?.maxWithdrawal} Birr`,
          formValue: setting?.withdrawalAmount?.maxWithdrawal,
          name: "maxWithdrawal",
        },
      ];
    case "bingoSettings":
      return [
        {
          label: "Players to Start",
          value: `${setting?.numberOfPlayersToStart} Players`,
          formValue: setting?.numberOfPlayersToStart,
          name: "numberOfPlayersToStart",
        },
        {
          label: "Cards Per Player",
          value: `${setting?.maxNumberCardsPerPlayer} Cards`,
          formValue: setting?.maxNumberCardsPerPlayer,
          name: "maxNumberCardsPerPlayer",
        },
        {
          label: "Active Games Limit",
          value: `${setting?.maxNumberActiveGames} Game${
            setting?.maxNumberActiveGames !== 1 ? "s" : ""
          }`,
          formValue: setting?.maxNumberActiveGames,
          name: "maxNumberActiveGames",
        },
      ];
    case "rewardSettings":
      return [
        {
          label: "First Deposit Bonus %",
          value: `${setting?.firstDepositBonusPercentage} %`,
          formValue: setting?.firstDepositBonusPercentage,
          name: "firstDepositBonusPercentage",
        },
        {
          label: "All Deposits Bonus %",
          value: `${setting?.allDepositsBonusPercentage} %`,
          formValue: setting?.allDepositsBonusPercentage,
          name: "allDepositsBonusPercentage",
        },
        {
          label: "Sign Up Bonus Amount",
          value: `${setting?.signUpBonusAmount} Birr`,
          formValue: setting?.signUpBonusAmount,
          name: "signUpBonusAmount",
        },
        {
          label: "Referral Bonus %",
          value: `${setting?.referralBonusPercentage} %`,
          formValue: setting?.referralBonusPercentage,
          name: "referralBonusPercentage",
        },
        {
          label: "Min Referral Payout",
          value: `${setting?.minReferralClaimAmount} Birr`,
          formValue: setting?.minReferralClaimAmount,
          name: "minReferralClaimAmount",
        },
      ];
    default:
      return [];
  }
};
