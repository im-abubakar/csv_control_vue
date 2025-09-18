<template>
  <PageHeader />
  <div class="pageActions">
    <BtnDropdown
      :columns="columns"
      :visibleColumns="visibleColumns"
      @updateVisibleColumns="updateVisibleColumns"
    />
    <div class="actionButtons">
      <q-btn
        @click="confirm = true"
        class="actionButton"
        outline
        rounded
        label="Export Table"
      />
      <q-btn to="/" class="actionButton" outline rounded>
        <div class="backButton">
          <BackSvg /> Back
        </div>
      </q-btn>
    </div>
  </div>

  <q-table
    v-if="filteredCsv"
    :title="filteredCsv.name"
    :rows="filteredCsv.content"
    :columns="columns"
    row-key="id"
    header-align="left"
    selection="multiple"
    v-model:selected="selected"
    :visibleColumns="visibleColumns"
  />

  <q-dialog v-model="confirm" persistent class="confirm-dialog">
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Do you want to export and download the table?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          outline
          rounded
          label="CANCEL"
          color="black"
          size="sm"
          class="custom-font-weight"
          v-close-popup
        />
        <q-btn
          rounded
          label="YES"
          color="black"
          size="sm"
          v-close-popup
          @click="exportTable(selected)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import { exportToExcel } from "../utils/exportToXlsx"
import BackSvg from "../assets/back.svg?component"

type CsvList = Array<{
  id: string
  name: string
  columns: string[]
  rows: string
  isExported: string
  created_at: string
  content: Array<any>
}>

export default {
  name: "CsvDetail",
  components: { BackSvg },
  data() {
    const csvDetail = null as { id: string; name: string; content: Array<any> } | null
    const filteredCsv = null as { id: string; name: string; content: Array<any> } | null
    const columns = [] as Array<any>
    const visibleColumns = [] as string[]

    return {
      filteredCsv,
      csvDetail,
      columns,
      visibleColumns,
    }
  },
  setup() {
    const route = useRoute()
    const selected = ref([])
    const confirm = ref(false)

    return {
      selected,
      confirm,
      csvId: route.params.id,
    }
  },
  mounted() {
    const localStorageCsvList = localStorage.getItem("csv_list")
    const csvList = (localStorageCsvList ? JSON.parse(localStorageCsvList) : []) as CsvList
    const csvItem = csvList.find((item) => item.id == this.csvId)
    if (csvItem) {
      this.filteredCsv = csvItem
      this.csvDetail = csvItem
      for (const column of csvItem.columns) {
        this.columns.push({ name: column, label: column, field: column, align: "left", sortable: true })
        this.visibleColumns.push(column)
      }
    }
  },
  methods: {
    updateVisibleColumns(newVisibleColumns: string[]) {
      if (this.csvDetail) {
        this.visibleColumns = newVisibleColumns
        this.filteredCsv = {
          ...this.csvDetail,
          content: this.csvDetail.content.map((obj) => {
            const filteredObj: { [key: string]: any } = {}
            newVisibleColumns.forEach((key) => {
              if (obj.hasOwnProperty(key)) filteredObj[key] = obj[key]
            })
            return filteredObj
          }),
        }
      }
    },
    exportTable(selected: Array<any>) {
      if (selected.length > 0) {
        exportToExcel(selected, this.filteredCsv?.name)
      } else if (this.filteredCsv) {
        exportToExcel(this.filteredCsv.content, this.filteredCsv.name)
      }
    },
  },
}
</script>

<style scoped>
.pageActions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}

.actionButtons {
  display: flex;
  gap: 10px;
}

.actionButton {
  text-transform: none;
  min-height: 1.5rem;
}

.backButton {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.backButton svg {
  width: 20px;
}

.confirm-dialog .q-card {
  border-radius: 20px;
}

.custom-font-weight {
  font-weight: 700;
}
</style>
