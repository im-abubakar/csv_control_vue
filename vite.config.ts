import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { quasar, transformAssetUrls } from "@quasar/vite-plugin"
import svgLoader from "vite-svg-loader"
import Components from "unplugin-vue-components/vite"
import { VantResolver } from "unplugin-vue-components/resolvers" // Opcional: Exemplo de um resolutor para componentes de Vant
import AutoImport from "unplugin-auto-import/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar(),
    svgLoader({
      defaultImport: "component",
    }),
    Components({
      // Configuração opcional do resolutor de componentes
      resolvers: [
        VantResolver(), // Exemplo de uso de um resolutor específico
      ],
    }),
    AutoImport({
      // Configuração opcional do resolutor de imports automáticos
      imports: ["vue", "vue-router"],
    }),
  ],
})
