import reactSchemaId from "@atrilabs/react-component-manifest-schema?id";
import type { ReactComponentManifestSchema } from "@atrilabs/react-component-manifest-schema";
import iconSchemaId from "@atrilabs/component-icon-manifest-schema?id";
import CSSTreeId from "@atrilabs/app-design-forest/src/cssTree?id";
import { CSSTreeOptions } from "@atrilabs/app-design-forest";
import { CustomPropsTreeOptions } from "@atrilabs/app-design-forest";
import CustomTreeId from "@atrilabs/app-design-forest/src/customPropsTree?id";

const cssTreeOptions: CSSTreeOptions = {
  boxShadowOptions: true,
  flexContainerOptions: false,
  flexChildOptions: true,
  positionOptions: true,
  typographyOptions: true,
  spacingOptions: true,
  sizeOptions: true,
  borderOptions: true,
  outlineOptions: true,
  backgroundOptions: true,
  miscellaneousOptions: true,
};

const customTreeOptions: CustomPropsTreeOptions = {
  dataTypes: {
    current: { type: "number" },
    size : {type : "enum",options: ["default","small"]},
    direction : {type : "enum",options: ["horizontal" , "vertical"]},
    dotStyle :{type : "enum",options: ["","dot","withHover"]},
    clickable:{ type: "boolean" } ,
    type: {type : "enum",options: ["default" , "navigation" , "inline"]},
    percent: {type : "number"},
    labelPlacement:{type : "enum",options: ["horizontal" , "vertical" ]},
    items: {
      type: "array_map",
      singleObjectName: "item",
      attributes: [
        { fieldName: "title", type: "text" },
        { fieldName: "subTitle", type: "text" },
        { fieldName: "description", type: "text" },
        { fieldName: "icon", type: "static_asset" },
        {
          fieldName: "status",
          type: "enum",
          options: ["wait", "process", "finish", "error"],
        },
        { fieldName: "disabled", type: "boolean" },
      ],
    },
   
  },
};

const compManifest: ReactComponentManifestSchema = {
  meta: { key: "Step", category: "Basics" },
  dev: {
    decorators: [],
    attachProps: {
      styles: {
        treeId: CSSTreeId,
        initialValue: {},
        treeOptions: cssTreeOptions,
        canvasOptions: { groupByBreakpoint: true },
      },
      custom: {
        treeId: CustomTreeId,
        initialValue: {
          items: [
            {
              title: "Finished",
              description: "description",
            },
            {
              title: "In Progress",
              description: "description",
              subTitle: "Left 00:00:08",
            },
            {
              title: "Waiting",
              description: "description",
            },
            {
              title: "Error",
              description: "description",
            },
          ],
          size : "default",
          current : 1,
          direction : "horizontal",
          clickable: false,
        },
        treeOptions: customTreeOptions,
        canvasOptions: { groupByBreakpoint: false },
      },
    },
    attachCallbacks: {
      onClick: [{ type: "do_nothing" }],
    },
    defaultCallbackHandlers: {
      onClick: [{ sendEventData: true }],
    },
  },
};

const iconManifest = {
  panel: { comp: "CommonIcon", props: { name: "Step" } },
  drag: {
    comp: "CommonIcon",
    props: { name: "Step", containerStyle: { padding: "1rem" } },
  },
  renderSchema: compManifest,
};

export default {
  manifests: {
    [reactSchemaId]: compManifest,
    [iconSchemaId]: iconManifest,
  },
};
