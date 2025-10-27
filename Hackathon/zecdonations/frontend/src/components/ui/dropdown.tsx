"use client";
import * as Dropdown from "@radix-ui/react-dropdown-menu";

export const DropdownMenu = Dropdown.Root;
export const DropdownTrigger = Dropdown.Trigger;
export const DropdownContent = (props: Dropdown.DropdownMenuContentProps) => (
  <Dropdown.Portal>
    <Dropdown.Content {...props} className="rounded-md border border-border bg-card p-2 shadow-lg" />
  </Dropdown.Portal>
);
export const DropdownItem = (props: Dropdown.DropdownMenuItemProps) => (
  <Dropdown.Item {...props} className="px-2 py-1.5 text-sm hover:bg-muted rounded" />
);


