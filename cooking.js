async function highlightStep(stepId, duration, description, color) {
  let step = document.getElementById(stepId);
  let currentTask = document.getElementById("currentTask");

  step.classList.add("active");
  step.style.backgroundColor = color;
  step.style.color = "black";
  currentTask.innerHTML = description;

  await new Promise((resolve) => setTimeout(resolve, duration));
  step.classList.remove("active");
}

function addMicrotask(taskDescription) {
  let microtasksQueue = document.getElementById("microtasksQueue");
  let taskElement = document.createElement("div");
  taskElement.textContent = taskDescription;
  taskElement.classList.add("microtask");
  taskElement.style.backgroundColor = "#16C47F";
  microtasksQueue.appendChild(taskElement);

  setTimeout(() => {
    microtasksQueue.removeChild(taskElement);
  }, 5000);
}

async function addMacrotask(taskDescription, color, duration = 5000) {
  return new Promise((resolve) => {
    let macroTasksQueue = document.getElementById("macroTasksQueue");

    let taskElement = document.createElement("div");
    taskElement.textContent = taskDescription;
    taskElement.classList.add("macrotask");
    taskElement.style.backgroundColor = color;

    macroTasksQueue.appendChild(taskElement);

    setTimeout(() => {
      macroTasksQueue.removeChild(taskElement);
      resolve();
    }, duration);
  });
}

function addPendingPromise(taskDescription) {
  let pendingPromises = document.getElementById("pendingPromises");
  let taskElement = document.createElement("div");
  taskElement.textContent = taskDescription;
  taskElement.classList.add("pending-promise");
  pendingPromises.appendChild(taskElement);
}

function addCallStack(taskDescription) {
  let callStack = document.getElementById("callStack");
  let taskElement = document.createElement("div");
  taskElement.textContent = taskDescription;
  taskElement.classList.add("callstack");
  callStack.appendChild(taskElement);

  setTimeout(() => {
    callStack.removeChild(taskElement);
  }, 5000);
}

async function startCooking() {
  resetCookingProcess();

  console.log("Starting cooking process - synchronous code executed first");

  addCallStack("🔪 Initial Execution: Preparing ingredients.");
  await highlightStep(
    "initialExecution",
    5000,
    `🔪 **Preparing ingredients and preheating the oven**.<br>
    <span>🍅 Chopping vegetables </span><br>
    <span> Gathering pasta sheets </span>`,
    "gold"
  );

  let boilingStep = document.getElementById("promiseExecutor");
  boilingStep.classList.add("active");
  boilingStep.style.backgroundColor = "#EB5353";
  document.getElementById("currentTask").innerHTML = `
    <span>🚰 Filling a pot and placing it on the stove.</span>
    <br>
    <span>🔥 Boiling water for pasta.</span> <br>
  `;

  console.log("Promise executor started - Water is boiling");
  addPendingPromise(
    "🔥 Waiting for water to boil (Promise Pending)",
    "#36AE7C"
  );

  setTimeout(async () => {
    console.log("Call stack execution - Cooking sauce while waiting for water");
    addCallStack("🍳 Cooking sauce");
    await highlightStep(
      "callStackExecution",
      5000,
      "🍳 **Cooking sauce while waiting for water.** Example: Sautéing onions, browning meat, adding tomato sauce.",
      "#3DB2FF"
    );
  }, 3000); // Sauce starts after 3s

  await new Promise((resolve) => setTimeout(resolve, 5000)); // Ensure delay before checking water

  document.getElementById("pendingPromises").innerHTML = "";
  let checkStep = document.getElementById("microtasksExecution");
  checkStep.classList.add("active");
  checkStep.style.backgroundColor = " #16C47F";
  addMicrotask("✅ Checking if water is boiling...");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  addMicrotask("🍝 Adding pasta to boiling water...");

  await highlightStep(
    "microtasksExecution",
    5000,
    "🛠 **Microtasks Execution:** Checking boiling water & adding pasta.",
    "#16C47F"
  );

  await highlightStep(
    "taskExecution",
    0,
    "🍽 **Task Execution:** Assembling and baking the lasagna.",
    "#8B5DFF"
  );

  console.log("Starting macrotasks for baking...");

  highlightStep(
    "taskExecution",
    10000,
    "🍽 **Task Execution Continues:** Baking and checking lasagna.",
    "#8B5DFF"
  );

  await addMacrotask("⏳ Timer set for baking...", "#8B5DFF");
  await addMacrotask("🚪 Opening oven to check lasagna...", "#8B5DFF");

  console.log("Lasagna is ready to serve!");
  document.getElementById("currentTask").innerHTML =
    "🎉 **Lasagna is Ready!** Time to eat!";
  alert("Lasagna is ready to serve!");
}

function resetCookingProcess() {
  console.log("Resetting the cooking process...");

  document.querySelectorAll(".step").forEach((step) => {
    step.classList.remove("active");
    step.style.backgroundColor = "";
  });

  document.getElementById("currentTask").innerHTML = "Waiting to start...";
  document.getElementById("microtasksQueue").innerHTML = "";
  document.getElementById("macroTasksQueue").innerHTML = "";
  document.getElementById("pendingPromises").innerHTML = "";
  document.getElementById("callStack").innerHTML = "";

  console.log("Cooking process reset. Ready to start again!");
}
