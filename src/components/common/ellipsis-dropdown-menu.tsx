"use client";

import { useCallback, useState } from "react";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

import { cn } from "~/lib/utils";
import { InternalLink, type InternalLinkPath } from "./internal-link";
import type { Routes } from "~/lib/internal-routes";

type ConfirmationAction = {
  text: string;
  onClick: () => void;
  className?: string;
};

type ConfirmationType = {
  enabled: boolean;
  title: string;
  description?: string;
  content?: React.ReactNode;
  actions?: ConfirmationAction[];
};

type ActionBaseType = {
  id: string;
  text: string;
  divider?: boolean;
  disabled?: boolean;
  className?: string;
};

type ButtonActionType<T> = ActionBaseType & {
  button: {
    onClick: (data: T) => void;
    confirmation?: ConfirmationType;
  };
  link?: never;
};

type InferParamsFromPath<TPath extends InternalLinkPath> = {
  path: TPath;
  params: Routes[TPath]["params"];
  query?: Routes[TPath]["query"];
};

type LinkActionType<TPath extends InternalLinkPath> = ActionBaseType & {
  link: InferParamsFromPath<TPath>;
  button?: never;
};

export type ActionType<T> =
  | ButtonActionType<T>
  | {
      [P in InternalLinkPath]: LinkActionType<P>;
    }[InternalLinkPath];

type EllipsisDropdownMenuProps<T> = {
  data: T;
  actions: Array<ActionType<T>>;
};

type EllipsisDropdownMenuItemProps<T> = {
  data: T;
  text: string;
  disabled?: boolean;
  className?: string;
  onConfirmationOpen?: () => void;
} & ActionType<T>;

export const EllipsisDropdownMenu = <T,>(
  props: EllipsisDropdownMenuProps<T>,
) => {
  const { data, actions } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<ButtonActionType<T> | null>(
    null,
  );

  const handleActionClick = useCallback(
    (action: ActionType<T>) => {
      if ("button" in action && action.button) {
        if (action.button.confirmation?.enabled) {
          setActiveAction(action);
          setDialogOpen(true);
          setDropdownOpen(false);
        } else {
          action.button.onClick(data);
          setDropdownOpen(false);
        }
      }
    },
    [data],
  );

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 flex-shrink-0 focus-visible:ring-0"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.length > 0 &&
            actions.map((action) => (
              <div
                key={`action-${action.id}`}
                className={cn(action.divider ? "border-accent border-b" : "")}
              >
                {action.link ? (
                  <DropdownMenuItem asChild>
                    <InternalLink
                      path={action.link.path}
                      params={action.link.params}
                      query={action.link.query}
                      className={cn(
                        "text-primary hover:bg-accent block px-4 py-2 text-sm",
                        action.className ?? "",
                        action.disabled
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer",
                      )}
                    >
                      {action.text}
                    </InternalLink>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleActionClick(action);
                    }}
                    disabled={action.disabled}
                    className={cn(
                      "text-primary block px-4 py-2 text-sm",
                      action.className ?? "",
                      action.disabled
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer",
                    )}
                  >
                    {action.text}
                  </DropdownMenuItem>
                )}
              </div>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {activeAction?.button?.confirmation?.enabled && (
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {activeAction.button.confirmation.title}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {activeAction.button.confirmation.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            {activeAction.button.confirmation.content}
            <AlertDialogFooter>
              <AlertDialogCancel className="focus-visible:ring-0">
                Cancel
              </AlertDialogCancel>
              {activeAction.button.confirmation.actions?.map((action) => (
                <AlertDialogAction
                  key={action.text}
                  onClick={() => {
                    action.onClick();
                    setDialogOpen(false);
                  }}
                  className={action.className}
                >
                  {action.text}
                </AlertDialogAction>
              ))}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export const EllipsisDropdownMenuItem = <T,>(
  props: EllipsisDropdownMenuItemProps<T>,
) => {
  const { data, text, className, disabled, link, button, onConfirmationOpen } =
    props;

  const handleButtonClick = useCallback(() => {
    if (button?.confirmation?.enabled) {
      onConfirmationOpen?.();
    } else {
      button?.onClick?.(data);
    }
  }, [button, data, onConfirmationOpen]);

  return (
    <>
      {button && (
        <DropdownMenuItem
          onClick={handleButtonClick}
          disabled={disabled}
          className={cn(
            "text-primary block px-4 py-2 text-sm",
            className ?? "",
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          )}
        >
          {text}
        </DropdownMenuItem>
      )}
      {link && (
        <DropdownMenuItem asChild>
          <InternalLink
            path={link.path}
            params={link.params}
            query={link.query}
            className={cn(
              "text-primary hover:bg-accent block px-4 py-2 text-sm",
              className ?? "",
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            )}
          >
            {text}
          </InternalLink>
        </DropdownMenuItem>
      )}
    </>
  );
};
