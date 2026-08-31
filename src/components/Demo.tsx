import { Dialog } from "radix-ui";

function MyDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-lg bg-black px-4 py-2 text-white">
          Open Dialog
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold">My Dialog</Dialog.Title>

          <Dialog.Description className="mt-2 text-gray-500">
            This is my dialog.
          </Dialog.Description>

          <div className="mt-5">
            <Dialog.Close asChild>
              <button className="rounded-lg bg-gray-200 px-4 py-2">
                Close
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default MyDialog;
