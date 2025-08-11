import AppButton from "@/components/AppButton";
import useToast from "@/hooks/useToast";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React, { useState } from "react";
import { FaTelegram } from "react-icons/fa6";
import { MdCopyAll } from "react-icons/md";
import { TbAffiliate } from "react-icons/tb";
import { FaEdit, FaShareAlt } from "react-icons/fa";
import { IoAdd, IoTicket } from "react-icons/io5";
import PromoCodeForm from "./PromoCodeForm";

const AffiliateManager = ({ player }) => {
  const { showMessage } = useToast();
  const [editPromoCode, setEditPromoCode] = useState(false);

  const referrals = [
    {
      title: "Promo Code",
      code: player?.promoCode,
      Icon: IoTicket,
      editable: true,
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

  const [anchor, setAnchor] = useState("left start");

  React.useEffect(() => {
    const updateAnchor = () => {
      if (window.innerWidth < 768) {
        setAnchor("bottom");
      } else {
        setAnchor("left start");
      }
    };

    updateAnchor();
    window.addEventListener("resize", updateAnchor);
    return () => window.removeEventListener("resize", updateAnchor);
  }, []);

  return (
    <div>
      <Popover className="relative">
        {({ close }) => (
          <>
            <PopoverButton className="focus:outline-none">
              <AppButton>
                <TbAffiliate className="text-lg" />
              </AppButton>
            </PopoverButton>
            <PopoverPanel
              anchor={anchor}
              className="flex flex-col bg-white shadow-2xl p-3 rounded-md z-10"
            >
              {referrals.map((referral, index) => (
                <div key={index} className="mb-2">
                  <div className="flex gap-2   ">
                    <div className="flex items-center px-2 py-1.5 bg-primary/20 rounded cursor-pointer">
                      <referral.Icon className="text-xl text text-primary" />
                    </div>
                    {editPromoCode && referral.editable ? (
                      <PromoCodeForm
                        player={player}
                        onSuccess={() => setEditPromoCode(false)}
                        onCancel={() => setEditPromoCode(false)}
                      />
                    ) : referral?.code ? (
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

                    {referral?.code &&
                      !(editPromoCode && referral.editable) && (
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
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  );
};

export default AffiliateManager;
