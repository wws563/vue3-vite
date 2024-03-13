<template>
  <el-menu default-active="0" class="el-menu-vertical-demo">
    <template v-for="(item, index) in compRoutes" :key="index">
      <!-- EXP:to不加‘/’跳转相对地址，会增加路由，加了就是绝对路由 -->
      <router-link
        v-if="!item.children && item.name"
        :to="(props.prefix ? '/' + props.prefix : '') + item.path"
        :key="index"
        @click="linkClick(item)"
      >
        <el-menu-item :index="index + ''">
          <el-icon>
            <component :is="item.meta?.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </router-link>

      <el-sub-menu :index="index + ''" v-else>
        <template #title>
          <el-icon>
            <component :is="item.meta?.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <router-link
          :to="
            (props.prefix ? '/' + props.prefix : '') +
            '/' +
            item.path +
            '/' +
            sub.path
          "
          v-for="(sub, subIndex) in item.children"
          :key="subIndex"
          @click="linkClick(item)"
        >
          <el-menu-item :index="index + '-' + subIndex">
            <el-icon>
              <component :is="sub.meta?.icon"></component>
            </el-icon>
            <span>{{ sub.name }}</span>
          </el-menu-item>
        </router-link>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import routes from '@/router/routes.ts';

// EXP: emit注册与使用
const emit = defineEmits(['linkClick']);

const props = defineProps<{ prefix?: string }>();
// const props = defineProps({
//   prefix: {
//     type: String,
//     default: '',
//   },
// });

// routes.shift();
const _routes = ref(routes);
const compRoutes = computed(() => {
  return _routes.value.filter((route) => route.path == '/doc')[0].children;
});

// 触发路由点击事件，用于移动端关闭弹层
const linkClick = (item: any) => {
  emit('linkClick', item);
  console.log(item);
};
</script>

<style lang="scss">
.el-menu-vertical-demo.el-menu {
  height: 100%;
  background-color: transparent;
  font-weight: 600;
}

a {
  text-decoration: none;
}
</style>
