import { forwardRef, useEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import { forkRef } from "../../utils/forkRef";
import { createPortal } from "react-dom";

type DialogRef = HTMLDialogElement;
type DialogProps = Omit<React.ComponentPropsWithoutRef<"dialog">, "children"> & {
  // 컴포넌트를 다이얼로그가 열렸을 때 마운트하기 위해 children을 함수로 받음
  children?: () => React.ReactNode;
};

export const Dialog = forwardRef<DialogRef, DialogProps>((props, ref) => {
  const { open = false, className, children, ...dialogProps } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

  // dialog 엘리먼트가 React처럼 동작하도록 개선
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [open]);

  return createPortal(
    <dialog className={cn("modal", className)} ref={forkRef(ref, dialogRef)} {...dialogProps}>
      {open && (
        <div className="modal-box">
          <form
            className="contents"
            method="dialog"
            // form 엘리먼트는 중첩되면 안되므로 Portal을 썼지만, 이벤트는 React에 의해 여전히 전파되므로 이를 차단
            onSubmit={(event) => event.stopPropagation()}
            onSubmitCapture={(event) => event.stopPropagation()}
          >
            <button
              type="submit"
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
              aria-label="Close dialog"
            >
              ✕
            </button>
          </form>
          {children?.()}
        </div>
      )}
    </dialog>,
    document.body,
  );
});

Dialog.displayName = "Dialog";
