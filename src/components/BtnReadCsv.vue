<template>
  <div>
    <q-btn
      @click="openFileInput"
      class="actionButton"
      outline
      rounded
      label="+ Import CSV"
    />
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="convertToJson"
    />
  </div>
</template>

<script>
import csv from "csvtojson"

export default {
  props: ["csvList"],
  methods: {
    openFileInput() {
      this.$refs.fileInput.click()
    },
    async convertToJson(event) {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = async () => {
        const csvData = reader.result
        try {
          const headers = []
          let jsonData = []
          const name = file.name.replace(/\.[^/.]+$/, "")

          await csv()
            .preFileLine((fileLine, lineIdx) => {
              if (lineIdx === 0) {
                headers.push(...fileLine.split(","))
              }
              return fileLine
            })
            .fromString(csvData)
            .then((jsonArray) => {
              jsonData = jsonArray.map((item, index) => ({
                ...item,
                id: index,
              }))
            })

          const newCsvEntry = {
            id: this.csvList.length,
            name,
            rows: jsonData.length,
            columns: headers,
            isExported: false,
            created_at: new Date().toISOString(),
            content: jsonData,
          }

          this.$emit("updateList", [...this.csvList, newCsvEntry])
        } catch (err) {
          console.log("Error reading CSV")
        }

        this.$refs.fileInput.value = null
      }
      reader.readAsText(file)
    },
  },
}
</script>

<style scoped>
.actionButton {
  text-transform: none;
  min-height: 1.5rem;
}
</style>
