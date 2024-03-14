import fs from 'fs-extra';

export default function copyFilesPlugin() {
  return {
    name: 'copy-files-plugin',
    apply: 'build',
    async writeBundle() {
      // 复制文件到目标文件夹
      await fs.copy('./dist', '//192.168.31.235/web/E1sonVue3');
    },
  };
}
