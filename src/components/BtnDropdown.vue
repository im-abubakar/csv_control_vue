<template>
  <q-btn-dropdown class="dropdownButton" outline rounded label="Columns">
    <q-list>
      <q-item clickable v-close-popup @click="showAllColumns">
        <q-item-section>
          <q-item-label>Show all columns</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="hideAllColumns">
        <q-item-section>
          <q-item-label>Hide all columns</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        v-close-popup
        v-for="(item, index) in columns"
        :key="index"
        @click="toggleColumn(item.name, visibleColumns.includes(item.name))"
      >
        <q-item-section>
          <q-toggle
            :model-value="visibleColumns.includes(item.name)"
            @click="toggleColumn(item.name, visibleColumns.includes(item.name))"
            :label="`Hide column ${item.name}`"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
export default {
  name: "BtnDropdown",
  props: ["columns", "visibleColumns", "updateVisibleColumns"],
  methods: {
    hideAllColumns() {
      this.$emit("updateVisibleColumns", [])
    },
    showAllColumns() {
      this.$emit("updateVisibleColumns", this.columns)
    },
    toggleColumn(columnName, isVisible) {
      let updatedVisibleColumns = []
      if (isVisible) {
        updatedVisibleColumns = this.visibleColumns.filter(
          (col) => col !== columnName
        )
      } else {
        updatedVisibleColumns = [...this.visibleColumns, columnName]
      }
      this.$emit("updateVisibleColumns", updatedVisibleColumns)
    },
  },
}
</script>

<style scoped>
.dropdownButton {
  text-transform: none;
  min-height: 1.5rem;
}
</style>
