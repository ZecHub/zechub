import { defineComponent } from 'vue';

import ImageUpload from '#/components/upload/image-upload.vue';

export function useImagesUpload() {
  return defineComponent({
    name: 'ImagesUpload',
    props: {
      multiple: {
        type: Boolean,
        default: true,
      },
      maxNumber: {
        type: Number,
        default: 5,
      },
    },
    setup() {
      // TODO: @dhb52 actually works with the default props, failed to transmit from the formCreate
      return (props: { maxNumber?: number; multiple?: boolean }) => (
        <ImageUpload maxNumber={props.maxNumber} multiple={props.multiple} />
      );
    },
  });
}
