import { throttle } from 'lodash';

export const screenWidthMixin = {
  data() {
    return {
      screenWidthMixinMounted: false,
    };
  },
  mounted() {
    if (!this.screenWidthMixinMounted) {
      this.handleResizeThrottled = throttle(this.$_handleResize, 200);
      window.addEventListener('resize', this.handleResizeThrottled);
      this.screenWidthMixinMounted = true;
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResizeThrottled);
    this.screenWidthMixinMounted = false;
  },
  methods: {
    $_handleResize() {
      this.$screenWidth = window.innerWidth;
      console.log('kuandu ', this.$screenWidth);
    },
  },
};
