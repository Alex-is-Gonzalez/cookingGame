async function highlightStep(stepId, duration, description, color) {
  let step = document.getElementById(stepId);
  let currentTask = document.getElementById("currentTask");

  step.classList.add("active");
  step.style.backgroundColor = color;
  currentTask.innerHTML = description;

  await new Promise((resolve) => setTimeout(resolve, duration));
  step.classList.remove("active");
}

function addMicrotask(taskDescription) {
  let microtasksQueue = document.getElementById("microtasksQueue");
  let taskElement = document.createElement("div");
  taskElement.textContent = taskDescription;
  taskElement.classList.add("microtask"); // Assign the microtask class
  microtasksQueue.appendChild(taskElement);

  setTimeout(() => {
    microtasksQueue.removeChild(taskElement);
  }, 10000);
}

function addPendingPromise(taskDescription) {
  let pendingPromises = document.getElementById("pendingPromises");
  let taskElement = document.createElement("div");
  taskElement.textContent = taskDescription;
  taskElement.classList.add("pending-promise"); // Assign the pending promise class
  pendingPromises.appendChild(taskElement);
}

function addCallStack(taskDescription) {
  let callStack = document.getElementById("callStack");
  let taskElement = document.createElement("div");
  taskElement.textContent = taskDescription;
  taskElement.classList.add("callstack"); // Assign the call stack class
  callStack.appendChild(taskElement);

  setTimeout(() => {
    callStack.removeChild(taskElement);
  }, 10000);
}

async function startCooking() {
  resetCookingProcess();

  console.log("Starting cooking process - synchronous code executed first");

  addCallStack("🔪 Initial Execution: Preparing ingredients.", "gold");
  await highlightStep(
    "initialExecution",
    10000,
    `🔪 **Preparing ingredients and preheating the oven**.<br>
    <span>🍅 Chopping vegetables </span><br>
    <span> gathering pasta sheets </span>`,
    "gold"
  );

  let boilingStep = document.getElementById("promiseExecutor");
  boilingStep.classList.add("active");
  boilingStep.style.backgroundColor = "lightcoral";
  document.getElementById("currentTask").innerHTML = `
    <span>🚰 Filling a pot and placing it on the stove.</span>
    <br>
    <span>🔥 Boiling water for pasta.</span> <br>
  `;

  console.log("Promise executor started - Water is boiling");
  addPendingPromise(
    "🔥 Waiting for water to boil (Promise Pending)",
    "lightcoral"
  );

  setTimeout(async () => {
    console.log("Call stack execution - Cooking sauce while waiting for water");
    addCallStack("🍳 Cooking sauce", "lightblue");
    await highlightStep(
      "callStackExecution",
      10000,
      "🍳 **Cooking sauce while waiting for water.** Example: Sautéing onions, browning meat, adding tomato sauce.",
      "lightblue"
    );
  }, 5000); // Sauce starts after 5s

  await new Promise((resolve) => setTimeout(resolve, 10000)); // Ensure delay before checking water

  addMicrotask("✅ Checking if water is boiling...", "lightgreen");
  await new Promise((resolve) => setTimeout(resolve, 5000));
  addMicrotask("🍝 Adding pasta to boiling water...", "lightgreen");

  await highlightStep(
    "microtasksExecution",
    10000,
    "🛠 **Microtasks Execution:** Checking boiling water & adding pasta.",
    "lightgreen"
  );

  document.getElementById("pendingPromises").innerHTML = "";

  await highlightStep(
    "taskExecution",
    10000,
    "🍽 **Task Execution:** Assembling and baking the lasagna.",
    "purple"
  );

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
  document.getElementById("pendingPromises").innerHTML = "";
  document.getElementById("callStack").innerHTML = "";

  console.log("Cooking process reset. Ready to start again!");
}
