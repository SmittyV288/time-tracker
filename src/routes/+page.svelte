<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { darkMode } from '$lib/theme';

    let isDark = false;
    let tasks = [];
    let title = '';
    let description = '';
    let errorMessage = '';

    // Subscribe to dark mode changes
    darkMode.subscribe((value) => (isDark = value));

    // Fetch tasks from Supabase
    const fetchTasks = async () => {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('start_time', { ascending: true });
        if (error) {
            console.error(error.message);
        } else {
            tasks = data;
        }
    };

    // Add a new task
    const addTask = async () => {
        if (!title.trim()) {
            errorMessage = 'Task title is required';
            return;
        }
        const { error } = await supabase
            .from('tasks')
            .insert([{ title, description }]);
        if (error) {
            errorMessage = error.message;
        } else {
            title = '';
            description = '';
            fetchTasks(); // Refresh the task list
        }
    };

    // Fetch tasks on component mount
    onMount(() => {
        fetchTasks();
    });
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
</p>

<div class="flex items-center">
    <label for="darkModeToggle" class="mr-2">Dark Mode</label>
    <input
        id="darkModeToggle"
        type="checkbox"
        bind:checked={isDark}
        on:change={() => darkMode.set(isDark)}
    />
</div>

<form on:submit|preventDefault={addTask} class="mb-4">
    <input
        type="text"
        placeholder="Task Title"
        bind:value={title}
        class="block mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
        required
    />
    <textarea
        placeholder="Task Description"
        bind:value={description}
        class="block mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
    ></textarea>
    <button
        type="submit"
        class="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
    >
        Add Task
    </button>
</form>

{#if errorMessage}
    <p class="text-red-500">{errorMessage}</p>
{/if}

<ul>
    {#each tasks as task}
        <li class="border p-4 rounded mb-4 dark:bg-gray-800 dark:text-white">
            <h3 class="text-lg font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p>{new Date(task.start_time).toLocaleString()}</p>
        </li>
    {/each}
</ul>
