import axios from "axios";
import { createApp } from "petite-vue";

const ITEMS_PER_PAGE = 10;

createApp({
  _currentPage: 1,
  _currentTag: "",
  _needle: "",
  records: [],
  filtersOpen: false,
  totalRecords: 0,
  totalPages: 0,
  searchActive: false,

  loading: true,
  tags: [],
  get currentPage() {
    return this._currentPage;
  },
  set currentPage(page) {
    if (this._currentPage !== page) {
      this._currentPage = page;
      this.fetchRecords();
    }
  },
  get currentTag() {
    return this._currentTag;
  },
  set currentTag(tag) {
    if (this._currentTag !== tag) {
      this._currentTag = tag;
      this._currentPage = 1;
      this.fetchRecords();
    }
  },
  get needle() {
    return this._needle;
  },
  set needle(needle) {
    if (this._needle !== needle) {
      this._needle = needle;
      this.currentPage = 1;
      this.fetchRecords();
    }
  },
  async fetchRecords() {
    try {
      // set loading
      this.loading = true;

      // hit proxy
      const response = await axios.get("/.netlify/functions/records", {
        params: {
          limit: ITEMS_PER_PAGE,
          start: (this.currentPage - 1) * ITEMS_PER_PAGE,
          q: this.needle,
          tag: this.currentTag,
        },
      });

      // assign data
      let { data, total } = response.data;

      // set state
      this.records = data;
      this.totalRecords = total;
      this.totalPages = Math.ceil(total / ITEMS_PER_PAGE);
      this.loading = false;
    } catch (err) {
      console.log(err);
    }
  },
  async fetchTags() {
    try {
      let { data } = await axios.get("/.netlify/functions/tags");
      this.tags = data;
    } catch (err) {
      console.log(err);
    }
  },
  init() {
    this.fetchRecords();
    this.fetchTags();
  },
  getRecordsByTag(tagId) {
    this.currentTag = tagId;
  },
  clearTags() {
    this.currentTag = "";
  },
  getRecordsBySearch() {
    if (!this.needle.length) {
      return;
    }
    this.searchActive = true;
  },
  clearSearch() {
    this.searchActive = false;
    this.needle = "";
  },
  prevPage() {
    this.currentPage--;
  },
  nextPage() {
    this.currentPage++;
  },
  firstPage() {
    this.currentPage = 1;
  },
  lastPage() {
    this.currentPage = this.totalPages;
  },
}).mount("#app");
