const steps = [
  {
    id: "initialExecution",
    description: "🔪 Preparing ingredients and preheating the oven.",
    color: "gold",
    callStack: "🔪 Initial Execution: Preparing ingredients.",
  },
  {
    id: "promiseExecutor",
    description: "🚰 Boiling water for pasta.",
    color: " #EB5353",
    pendingPromise: "🔥 Waiting for water to boil (Promise Pending)",
  },
  {
    id: "callStackExecution",
    description: "🍳 Cooking sauce while waiting for water.",
    color: "#16C47F",
    callStack: "🍳 Cooking sauce",
    pendingPromise: "🔥 Waiting for water to boil (Promise Pending)",
  },
  {
    id: "microtasksExecution",
    description: "🛠 Checking boiling water & adding pasta.",
    color: "#16C47F",
    callStack: "🍳 Cooking sauce",
    pendingPromise: "🔥 Waiting for water to boil (Promise Pending)",
    microtasks: ["✅ Checking if water is boiling..."],
  },
  {
    id: "microtasksExecution",
    description: "🛠 Checking boiling water & adding pasta.",
    color: "#16C47F",
    microtasks: ["🍝 Adding pasta to boiling water..."],
  },
  {
    id: "taskExecution",
    description: "🍽 Assembling and baking the lasagna.",
    color: "#8B5DFF",
    macrotasks: ["⏳ Timer set for baking..."],
  },
  {
    id: "taskExecution",
    description: "🍽 Assembling and baking the lasagna.",
    color: "#8B5DFF",
    macrotasks: ["🚪 Opening oven to check lasagna..."],
  },
];

let currentStep = -1;

function highlightStep(stepIndex) {
  resetVisualization();

  if (stepIndex < 0 || stepIndex >= steps.length) {
    document.getElementById("currentTask").innerHTML = "Waiting to start...";
    return;
  }

  const step = steps[stepIndex];
  const stepElement = document.getElementById(step.id);
  stepElement.classList.add("active");
  stepElement.style.backgroundColor = step.color;
  document.getElementById("currentTask").innerHTML = step.description;

  if (step.callStack) addCallStack(step.id, step.callStack);
  if (step.pendingPromise) addPendingPromise(step.pendingPromise, step.color);
  if (step.microtasks)
    step.microtasks.forEach((task) => addMicrotask(task, step.color));
  if (step.macrotasks)
    step.macrotasks.forEach((task) => addMacrotask(task, step.color));
}

function addPendingPromise(taskDescription, color) {
  let pendingPromises = document.getElementById("pendingPromises");
  let taskElement = document.createElement("div");
  taskElement.textContent = taskDescription;
  taskElement.style.backgroundColor = color;
  pendingPromises.appendChild(taskElement);
}

function addMicrotask(taskDescription, color) {
  let microtasksQueue = document.getElementById("microtasksQueue");
  let taskElement = document.createElement("div");
  taskElement.textContent = taskDescription;
  taskElement.style.backgroundColor = color;
  microtasksQueue.appendChild(taskElement);
}

function addMacrotask(taskDescription, color) {
  let macrotasksQueue = document.getElementById("macrotasksQueue");
  let taskElement = document.createElement("div");
  taskElement.textContent = taskDescription;
  taskElement.style.backgroundColor = color;
  macrotasksQueue.appendChild(taskElement);
}

function addCallStack(stepId, taskDescription) {
  let callStack = document.getElementById("callStack");
  let taskElement = document.createElement("div");
  taskElement.textContent = taskDescription;
  taskElement.classList.add("callstack");

  let stepElement = document.getElementById(stepId);
  if (stepElement) {
    let stepColor = window.getComputedStyle(stepElement).backgroundColor;
    taskElement.style.backgroundColor = stepColor;
  }

  callStack.appendChild(taskElement);
}

function resetVisualization() {
  document.querySelectorAll(".step").forEach((step) => {
    step.classList.remove("active");
    step.style.backgroundColor = "";
  });

  document.getElementById("callStack").innerHTML = "";
  document.getElementById("pendingPromises").innerHTML = "";
  document.getElementById("microtasksQueue").innerHTML = "";
  document.getElementById("macrotasksQueue").innerHTML = "";
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    highlightStep(currentStep);
  } else {
    alert("🎉 Lasagna is ready! Time to eat!");
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    highlightStep(currentStep);
  } else {
    resetVisualization();
    currentStep = -1;
  }
}
