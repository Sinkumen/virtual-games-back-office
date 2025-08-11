import { useUpdateUserPromoCode } from "@/api/services/playersServices";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import useToast from "@/hooks/useToast";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React, { useState } from "react";
import { FaTelegram } from "react-icons/fa6";
import { MdCancel, MdCopyAll } from "react-icons/md";
import { TbAffiliate } from "react-icons/tb";
import { FaEdit, FaShareAlt } from "react-icons/fa";
import { IoAdd, IoTicket } from "react-icons/io5";
import { Divider } from "@mui/material";

const AffiliateManager = ({ player }) => {
  const { showMessage } = useToast();

  const { mutate: updatePromoCode, isPending } = useUpdateUserPromoCode();
  const [editPromoCode, setEditPromoCode] = useState(false);

  const handleUpdatePromoCode = (event) => {
    event.preventDefault();
    const promoCode = event.target.promo_code.value;
    if (!promoCode) {
      return;
    }

    updatePromoCode(
      { userId: player?._id, promoCode },
      {
        onSuccess: () => {
          showMessage("Promo code updated successfully");
          setEditPromoCode(false);
        },
        onError: (error) => {
          showMessage(`Error updating promo code: ${error.message}`, {
            type: "error",
          });
        },
      }
    );
  };

  const referrals = [
    {
      title: "Promo Code",
      code: player?.promoCode,
      Icon: IoTicket,
    },
    {
      title: "Telegram Invite",
      prefix: "https://t.me/AbolGamesBot?start=",
      code: player?.referralCode,
      Icon: FaTelegram,
    },
    {
      title: "Referral Link",
      prefix: "https://abolgames.com?referralCode=",
      code: player?.referralCode,
      Icon: FaShareAlt,
    },
  ];

  const handleCopyToClipboard = (referral) => {
    const textToCopy = referral.prefix
      ? `${referral.prefix}${referral.code}`
      : referral.code;

    navigator.clipboard.writeText(textToCopy).then(() => {
      showMessage(`Copied ${textToCopy} to clipboard!`);
    });
  };

  return (
    <div>
      <Popover className="relative">
        {({ close }) => (
          <>
            <PopoverButton>
              <AppButton>
                <TbAffiliate className="text-lg" />
              </AppButton>
            </PopoverButton>
            <PopoverPanel
              anchor="left start"
              className="flex flex-col bg-white shadow-2xl p-3 rounded-md"
            >
              {referrals.map((referral, index) => (
                <div key={index} className="mb-2">
                  <div className="flex gap-2   ">
                    <div className="flex items-center px-2 py-1.5 bg-primary/20 rounded cursor-pointer">
                      <referral.Icon className="text-xl text text-primary" />
                    </div>
                    {referral?.code ? (
                      <div className="bg-gray-200 rounded w-full px-2 py-1 max-w-[360px] overflow-auto">
                        <p
                          className={`${
                            referral?.prefix
                              ? "text-sm font-semibold"
                              : "uppercase  font-bold"
                          } truncate`}
                        >
                          {referral?.prefix}
                          {referral?.code}
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditPromoCode(true)}
                        className="flex items-center text-primary px-2 py-1.5 bg-primary/10 rounded cursor-pointer"
                      >
                        <IoAdd className="text-xl" />
                        <p className="text-sm ">Create Promo Code</p>
                      </button>
                    )}

                    {referral?.code && (
                      <div className="flex gap-1">
                        {
                          <button
                            onClick={() => handleCopyToClipboard(referral)}
                            className="flex items-center px-2 py-1.5 bg-primary/20 rounded cursor-pointer"
                          >
                            <MdCopyAll className="text-xl text text-primary" />
                          </button>
                        }

                        {!referral?.prefix && (
                          <button
                            onClick={() => setEditPromoCode(true)}
                            className="px-2 py-1.5 bg-primary/20 rounded cursor-pointer"
                          >
                            <FaEdit className="text-xl text-primary" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {editPromoCode && (
                <form
                  onSubmit={(event) => handleUpdatePromoCode(event, close)} // Pass close to handleRefill
                  method="POST"
                  className="flex gap-2 items-end w-full"
                >
                  <div className="flex gap-2 w-full">
                    <div className="flex items-center px-2 py-1.5 bg-primary/20 rounded cursor-pointer">
                      <IoTicket className="text-xl text text-primary" />
                    </div>
                    <AppInput
                      dense
                      defaultValue={player?.promoCode}
                      className={"min-w-[130px] w-full uppercase"}
                      name="promo_code"
                      required={true}
                      // label="Promo Code"
                      placeholder="Promo Code"
                      minLength={4}
                      maxLength={6}
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <AppButton dense type="submit" loading={isPending}>
                      Save
                    </AppButton>
                    <AppButton
                      disabled={isPending}
                      bgColor={"bg-red-500"}
                      onClick={() => setEditPromoCode(false)}
                    >
                      <MdCancel />
                    </AppButton>
                  </div>
                </form>
              )}
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  );
};

export default AffiliateManager;
