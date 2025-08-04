import {
  useActivateShopCardVariants,
  useUpdateShopCardVariants,
} from "@/api/services/shopServices";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import AppModal from "@/components/AppModal";
import { ERROR } from "@/constants/toast";
import useToast from "@/hooks/useToast";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import React, { useRef, useState } from "react";
import { MdEdit, MdMoreVert } from "react-icons/md";
import EditVariant from "./EditVariant";
import ChangePassword from "@/components/ChangePassword";

const VariantOptions = ({ variant }) => {
  const buttonRef = useRef(null); // ← ref for MenuButton
  const { showMessage } = useToast();
  const {
    mutate: activateVariant,
    isPending,
    error,
  } = useActivateShopCardVariants();

  const handleActivate = () => {
    const data = {
      shopId: variant.shopRelations?.[0]?.shopId,
      clusterId: variant._id,
      isActive: true,
    };
    activateVariant(data, {
      onSuccess: () => {
        if (buttonRef.current) {
          buttonRef.current.click();
        }
        showMessage("Variant activated successfully!");
      },
      onError: (error) => {
        // Handle error
        showMessage(error.message, { type: ERROR });
      },
    });
  };

  return (
    <div className="flex items-center ">
      <Menu>
        <MenuButton ref={buttonRef} className="cursor-pointer ">
          <MdMoreVert className="text-xl text-primary " />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-primary shadow-2xl transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem disabled={variant.isActive || isPending}>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleActivate();
              }}
              className={`group flex items-center gap-2 rounded-lg px-3 py-1.5 ${
                variant.isActive || isPending
                  ? " opacity-50"
                  : "hover:bg-primary/15"
              } w-full`}
            >
              <CheckCircleIcon className="size-4 fill-primary" />
              Activate
            </button>
          </MenuItem>
          <MenuItem>
            <EditVariant
              variant={variant}
              onSuccess={() => {
                if (buttonRef.current) {
                  buttonRef.current.click();
                }
              }}
            />
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default VariantOptions;
