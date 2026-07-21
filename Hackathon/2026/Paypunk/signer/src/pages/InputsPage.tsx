import { useState } from "react";
import {
  Block,
  BlockTitle,
  Button,
  List,
  ListInput,
  ListItem,
  Toggle,
  Range,
  Segmented,
  SegmentedButton,
  Stepper,
  Link,
  Notification,
  Checkbox,
  Radio,
} from "konsta/react";
import { invoke, GreetResult } from "../backend";

export default function InputsPage() {
  const [name, setName] = useState("");
  const [greetMsg, setGreetMsg] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [rangeVal, setRangeVal] = useState(50);
  const [stepperVal, setStepperVal] = useState(0);
  const [toggleChecked, setToggleChecked] = useState(false);
  const [segmentedVal, setSegmentedVal] = useState(0);
  const [checkboxChecked, setCheckboxChecked] = useState<string[]>([]);
  const [radioVal, setRadioVal] = useState("a");
  const [searchQuery, setSearchQuery] = useState("");

  const handleGreet = async () => {
    if (!name.trim()) return;
    try {
      const res = await invoke<GreetResult>("greet", { name });
      setGreetMsg(res.message);
    } catch {
      setGreetMsg(`Hello, ${name}! (fallback)`);
    }
    setNotifOpen(true);
  };

  const toggleCheckbox = (val: string) => {
    setCheckboxChecked((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  return (
    <>
      <BlockTitle>Buttons</BlockTitle>
      <Block strong>
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button>Fill</Button>
          <Button outline>Outline</Button>
          <Button clear>Clear</Button>
          <Button small>Small</Button>
          <Button large>Large</Button>
          <Button rounded>Rounded</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Block>

      <BlockTitle>Greet (Rust IPC)</BlockTitle>
      <Block strong>
        <List>
          <ListInput
            label="Your name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </List>
        <Button className="mt-2" onClick={handleGreet}>
          Greet
        </Button>
      </Block>

      <Notification
        opened={notifOpen}
        title="Greeting"
        text={greetMsg}
        onClose={() => setNotifOpen(false)}
      />

      <BlockTitle>Toggles & Switches</BlockTitle>
      <Block strong>
        <List>
          <ListItem
            title="Toggle"
            after={
              <Toggle
                checked={toggleChecked}
                onChange={() => setToggleChecked(!toggleChecked)}
              />
            }
          />
        </List>
      </Block>

      <BlockTitle>Range Slider</BlockTitle>
      <Block strong>
        <Range
          value={rangeVal}
          min={0}
          max={100}
          step={1}
          onChange={(e) => setRangeVal(Number(e.target.value))}
        />
        <p className="text-sm text-gray-500 mt-1">Value: {rangeVal}</p>
      </Block>

      <BlockTitle>Segmented Control</BlockTitle>
      <Block strong>
        <Segmented>
          <SegmentedButton
            active={segmentedVal === 0}
            onClick={() => setSegmentedVal(0)}
          >
            Option A
          </SegmentedButton>
          <SegmentedButton
            active={segmentedVal === 1}
            onClick={() => setSegmentedVal(1)}
          >
            Option B
          </SegmentedButton>
          <SegmentedButton
            active={segmentedVal === 2}
            onClick={() => setSegmentedVal(2)}
          >
            Option C
          </SegmentedButton>
        </Segmented>
      </Block>

      <BlockTitle>Stepper</BlockTitle>
      <Block strong>
        <Stepper
          value={stepperVal}
          onMinus={() => setStepperVal((v) => Math.max(-10, v - 1))}
          onPlus={() => setStepperVal((v) => Math.min(10, v + 1))}
        />
      </Block>

      <BlockTitle>Checkboxes</BlockTitle>
      <List strongIos outlineIos>
        {["Apple", "Banana", "Cherry"].map((fruit) => (
          <ListItem
            key={fruit}
            label                                   // renders it as a checkbox row
            title={fruit}
            media={
              <Checkbox
                component="div"
                checked={checkboxChecked.includes(fruit)}
                onChange={() => toggleCheckbox(fruit)}
              />
            }
          />
        ))}
      </List>

      <BlockTitle>Radio Buttons</BlockTitle>
      <List strongIos outlineIos>
        {["a", "b", "c"].map((val) => (
          <ListItem
            key={val}
            label
            title={`Option ${val.toUpperCase()}`}
            media={
              <Radio
                component="div"
                checked={radioVal === val}
                onChange={() => setRadioVal(val)}
              />
            }
          />
        ))}
      </List>

      <BlockTitle>Links</BlockTitle>
      <Block strong>
        <Link onClick={() => { }}>Default Link</Link>
        <Link iconOnly>
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          </svg>
        </Link>
      </Block>

      <BlockTitle>Searchbar</BlockTitle>
      <Block strong>
        <List>
          <ListInput
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </List>
      </Block>
    </>
  );
}
