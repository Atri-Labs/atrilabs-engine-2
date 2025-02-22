import React, { forwardRef, ReactNode, ChangeEventHandler } from "react";
import { Input as AntdInput } from "antd";
const TextArea = AntdInput.TextArea;

const Textarea = forwardRef<
  HTMLDivElement,
  {
    styles: React.CSSProperties;
    custom: { text: string; placeholder: string };
    onChange: ChangeEventHandler<HTMLElement>;
    onPressEnter?: () => void;
    onResize?: () => { width: number; height: number }; //The callback function that is triggered when resize
    className?: string;
    autoSize?: boolean | object; //Height autosize feature, can be set to true | false or an object { minRows: 2, maxRows: 6 }
    allowClear?: boolean | { clearIcon: ReactNode }; //	If allow to remove textarea content with clear icon
    bordered?: boolean; //Whether has border style
    defaultValue?: string; //The initial textarea content
    disabled?: boolean; //Whether the textarea is disabled
    id?: string; //The ID for textarea
    maxLength?: number; //The max length
    showCount?:
      | boolean
      | {
          formatter: (info: {
            value: string;
            count: number;
            maxLength?: number;
          }) => ReactNode;
        }; //Whether show text count
  }
>((props, ref) => {
  const { custom, ...restProps } = props;
  // moved ref to div, as the Antd TextArea doesnt provide ref for TextArea
  return (
    <div ref={ref} style={{ display: "inline-block" }}>
      <TextArea {...restProps} {...custom} value={props.custom.text} />
    </div>
  );
});

export default Textarea;
