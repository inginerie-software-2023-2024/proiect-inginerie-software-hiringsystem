import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import * as React from "react";

const PrimaryEmailComboBox = ({ form, primaryEmail, setPrimaryEmail }) => {
  const [open, setOpen] = React.useState(false);

  const emails = form.getValues("emails").map((email) => email.item);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {primaryEmail}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search email..." />
          <CommandEmpty>No email found.</CommandEmpty>
          <CommandGroup>
            {emails.map((email: string) => (
              <CommandItem
                key={email}
                value={email}
                onSelect={(currentValue) => {
                  form.setValue("primaryEmail", currentValue);
                  setPrimaryEmail(currentValue);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    primaryEmail === email ? "opacity-100" : "opacity-0"
                  )}
                />
                {email}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PrimaryEmailComboBox;