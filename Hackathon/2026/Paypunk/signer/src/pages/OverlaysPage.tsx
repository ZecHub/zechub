import { useState } from "react";
import {
  Block,
  BlockTitle,
  Button,
  Popup,
  Sheet,
  Dialog,
  Actions,
  ActionsGroup,
  ActionsButton,
  ActionsLabel,
  Page,
  DialogButton,
} from "konsta/react";

export default function OverlaysPage() {
  const [popupOpened, setPopupOpened] = useState(false);
  const [sheetOpened, setSheetOpened] = useState(false);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [actionsOpened, setActionsOpened] = useState(false);

  return (
    <>
      <BlockTitle>Overlays</BlockTitle>
      <Block strong>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setPopupOpened(true)}>
            Open Popup
          </Button>
          <Button onClick={() => setSheetOpened(true)}>
            Open Sheet
          </Button>
          <Button onClick={() => setDialogOpened(true)}>
            Open Dialog
          </Button>
          <Button onClick={() => setActionsOpened(true)}>
            Open Actions
          </Button>
        </div>
      </Block>

      <Popup opened={popupOpened}>
        <Page>
          <BlockTitle>Popup</BlockTitle>
          <Block>
            <p>This is a Konsta UI Popup overlay.</p>
            <Button className="mt-4" onClick={() => setPopupOpened(false)}>
              Close
            </Button>
          </Block>
        </Page>
      </Popup>

      <Sheet
        opened={sheetOpened}
      >
        <BlockTitle>Action Sheet</BlockTitle>
        <Block>
          <p>This is a bottom sheet.</p>
          <Button className="mt-4" onClick={() => setSheetOpened(false)}>
            Close
          </Button>
        </Block>
      </Sheet>

      <Dialog
        opened={dialogOpened}
        title="Dialog"
        content="This is a Konsta UI Dialog overlay."
        buttons={[
          <DialogButton key="cancel" onClick={() => setDialogOpened(false)}>Cancel</DialogButton>,
          <DialogButton key="ok" onClick={() => setDialogOpened(false)}>Ok</DialogButton>,
        ]}
      />

      <Actions opened={actionsOpened}>
        <ActionsGroup>
          <ActionsLabel>Action Sheet</ActionsLabel>
          <ActionsButton onClick={() => setActionsOpened(false)}>
            Option One
          </ActionsButton>
          <ActionsButton onClick={() => setActionsOpened(false)}>
            Option Two
          </ActionsButton>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsButton bold onClick={() => setActionsOpened(false)}>
            Cancel
          </ActionsButton>
        </ActionsGroup>
      </Actions>
    </>
  );
}
