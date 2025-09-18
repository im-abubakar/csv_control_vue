<template>
  <PageHeader />
  <div class="pageActions">
    <span>Your Files</span>
    <BtnReadCsv :csvList="csvList" @updateList="updateList" />
  </div>

  <div v-if="csvList.length > 0">
    <q-table
      title="CSV Listing"
      :rows="csvList"
      :columns="columns"
      row-key="id"
      header-align="left"
      @row-click="onRowClick"
    >
      <template v-slot:body-cell-download="props">
        <q-td :props="props">
          <q-btn flat @click.stop="downloadCsv(props.row.id)" class="downloadIcon">
            <DownloadIcon />
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>

  <div v-else class="emptyTable">
    <EmptyTableIcon class="tableIcon" />
    <strong>No imported tables</strong>
    <span>Import by clicking the "+ Import CSV" button above to get started</span>
  </div>
</template>

<script lang="ts">
import EmptyTableIcon from "../assets/tableIcon.svg?component"
import DownloadIcon from "../assets/downloadIcon.svg?component"
import { format as formatFNS } from "date-fns"
import { enUS as dateEN } from "date-fns/locale"
import { exportToExcel } from "../utils/exportToXlsx"
import { useRouter } from "vue-router"

type CsvList = Array<{
  id: string
  name: string
  columns: string[]
  rows: string
  isExported: boolean
  created_at: string
  content: Array<any>
}>
type Column = {
  name: string
  label: string
  field: string | ((row: any) => any)
  required?: boolean
  align?: "left" | "right" | "center"
  sortable?: boolean
  sort?: (a: any, b: any, rowA: any, rowB: any) => number
  format?: (val: any, row: any) => any
}

let csvList: CsvList = []
let columns: Column[] = []

export default {
  name: "CsvList",
  components: { EmptyTableIcon, DownloadIcon },
  data() {
    return {
      csvList,
      columns,
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  mounted() {
    const localStorageCsvList = localStorage.getItem("csv_list")
    this.csvList = localStorageCsvList ? JSON.parse(localStorageCsvList) : []

    this.columns = [
      { name: "name", label: "Name", field: "name", align: "left", sortable: true },
      {
        name: "columns",
        label: "Number of Columns",
        field: "columns",
        align: "left",
        sortable: true,
        format: (val: string[]) => val.length,
      },
      {
        name: "rows",
        label: "Number of Rows",
        field: "rows",
        align: "left",
        sortable: true,
      },
      {
        name: "isExported",
        label: "Exported",
        field: "isExported",
        align: "left",
        sortable: true,
        format: (val: boolean) => (val ? "Yes" : "No"),
      },
      {
        name: "created_at",
        label: "Created At",
        field: "created_at",
        align: "left",
        sortable: true,
        format: (val: string) => formatFNS(new Date(val), "dd/MM/yyyy HH:mm", { locale: dateEN }),
      },
      { name: "download", label: "Download", field: "", align: "left" },
    ]
  },
  methods: {
    updateList(newCsvList: CsvList) {
      this.csvList = newCsvList
      localStorage.setItem("csv_list", JSON.stringify(newCsvList))
    },
    onRowClick(_: any, row: { id: string }) {
      this.router.push(`/csv/${row.id}`)
    },
    downloadCsv(id: string) {
      const itemToDownload = this.csvList.find((item) => item.id == id)
      if (itemToDownload) {
        try {
          exportToExcel(itemToDownload.content, itemToDownload.name)
          const newCsvList = this.csvList.map((item) =>
            item.id == id ? { ...item, isExported: true } : item
          )
          this.updateList(newCsvList)
        } catch (err) {
          console.log("Error exporting CSV")
        }
      }
    },
  },
}
</script>

<style scoped>
.pageHeader {
  color: var(--cyan-500);
  font-weight: 600;
}

.pageActions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  margin: 1.25rem 0;
}

.emptyTable {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  flex: 1;
  background: white;
}

.tableIcon {
  width: 100px;
}

.downloadIcon {
  border: none;
  outline: none;
  box-shadow: none;
}
.downloadIcon svg {
  width: 25px;
}
</style>
