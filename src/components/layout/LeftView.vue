<template>
  <el-menu default-active="0" class="el-menu-vertical-demo">
    <template v-for="(item, index) in _routes" :key="index">
      <router-link :to="item.path" v-if="!item.children" :key="index">
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
          :to="item.path + '/' + sub.path"
          v-for="(sub, subIndex) in item.children"
          :key="subIndex"
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
import routes from '@/router/routes.js';
routes.shift();
const _routes = ref(routes);
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
