class ChartBlock {
  static get toolbox() {
    return { title: "Chart", icon: "📊" };
  }

  constructor({ data }) {
    this.data = data || {
      type: "bar",
      labels: ["Label 1", "Label 2"],
      values: [10, 20],
    };
  }

  render() {
    this.container = document.createElement("div");
    this.container.classList.add("p-4", "bg-white", "rounded", "shadow-sm", "border");

    this.container.innerHTML = `
      <div class="mb-3">
        <label for="chartType" class="form-label">Chart Type:</label>
        <select id="chartType" class="form-select">
          <option value="bar" ${this.data.type === "bar" ? "selected" : ""}>Bar</option>
          <option value="line" ${this.data.type === "line" ? "selected" : ""}>Line</option>
          <option value="pie" ${this.data.type === "pie" ? "selected" : ""}>Pie</option>
        </select>
      </div>

      <div id="inputFields" class="mb-3">
        ${this.data.labels && this.data.values && this.data.labels.length === this.data.values.length
          ? this.data.labels.map((label, i) => this.createInputField(label, this.data.values[i])).join("")
          : ""}
      </div>

      <button id="addData" class="btn btn-outline-primary w-100">+ Add Data</button>

      <canvas id="chartCanvas" class="mt-3"></canvas>

      <button id="downloadChart" class="btn btn-outline-success mt-3 w-100">
        Download Chart 📥
      </button>
    `;

    this.chartTypeSelect = this.container.querySelector("#chartType");
    this.inputFields = this.container.querySelector("#inputFields");
    this.canvas = this.container.querySelector("#chartCanvas");
    this.addDataBtn = this.container.querySelector("#addData");
    this.downloadButton = this.container.querySelector("#downloadChart");

    this.chartTypeSelect.addEventListener("change", () => this.updateChart());
    this.addDataBtn.addEventListener("click", () => this.addInputField());
    this.downloadButton.addEventListener("click", () => this.downloadChart());

    this.renderChart();
    return this.container;
  }

  createInputField(label, value) {
    return `
      <div class="data-row d-flex align-items-center mb-2">
        <input type="text" class="form-control label" value="${label}" placeholder="Label" style="flex: 1; margin-right: 10px; color: #000;" />
        <input type="number" class="form-control value" value="${value}" placeholder="Value" style="width: 120px; color: #000;" />
        <input type="color" class="form-control color-picker" style="width: 40px;" />
        <button class="btn btn-outline-danger btn-sm remove ms-2" style="padding: 5px 10px; border-radius: 5px; font-weight: bold;">
          ❌
        </button>
      </div>
    `;
  }

  addInputField() {
    this.inputFields.insertAdjacentHTML("beforeend", this.createInputField("", 0));

    this.inputFields.lastElementChild.querySelector(".remove").addEventListener("click", (e) => {
      e.target.parentElement.remove();
      this.updateChart();
    });

    this.inputFields.lastElementChild.querySelector(".color-picker").addEventListener("input", () => {
      this.updateChart();
    });

    this.attachInputListeners();
  }

  attachInputListeners() {
    this.inputFields.querySelectorAll(".label, .value").forEach((input) => {
      input.addEventListener("input", () => this.updateChart());
    });

    this.inputFields.querySelectorAll(".remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.target.parentElement.remove();
        this.updateChart();
      });
    });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  renderChart() {
    const labelInputs = this.inputFields.querySelectorAll(".label");
    const valueInputs = this.inputFields.querySelectorAll(".value");
    const colorPickers = this.inputFields.querySelectorAll(".color-picker");

    if (!labelInputs.length || !valueInputs.length) {
      console.log("No data yet to render chart.");
      return;
    }

    const labels = Array.from(labelInputs).map((input) => input.value || "Label");
    const values = Array.from(valueInputs).map((input) => parseFloat(input.value) || 0);

    const colors = Array.from(valueInputs).map(() => this.getRandomColor());

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(this.canvas, {
      type: this.chartTypeSelect.value,
      data: {
        labels: labels,
        datasets: [{
          label: "Dataset",
          data: values,
          backgroundColor: colors,
          borderColor: colors.map(color => this.darkenColor(color)),
          borderWidth: 1,
        }],
      },
    });
  }

  darkenColor(color) {
    let colorCode = color.replace("#", "");
    let r = parseInt(colorCode.substring(0, 2), 16);
    let g = parseInt(colorCode.substring(2, 4), 16);
    let b = parseInt(colorCode.substring(4, 6), 16);

    r = Math.max(0, r - 20);
    g = Math.max(0, g - 20);
    b = Math.max(0, b - 20);

    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  updateChart() {
    this.renderChart();
  }

  downloadChart() {
    const link = document.createElement("a");
    link.href = this.canvas.toDataURL("image/png");
    link.download = "chart.png";
    link.click();
  }

  save() {
    const labelInputs = this.inputFields.querySelectorAll(".label");
    const valueInputs = this.inputFields.querySelectorAll(".value");
    const colorPickers = this.inputFields.querySelectorAll(".color-picker");

    const labels = Array.from(labelInputs).map((input) => input.value || "Label");
    const values = Array.from(valueInputs).map((input) => parseFloat(input.value) || 0);
    const colors = Array.from(colorPickers).map((input) => input.value || "#000000");

    return {
      type: this.chartTypeSelect.value,
      labels: labels,
      values: values,
      colors: colors,
    };
  }
}
