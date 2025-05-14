<template>
    <div class="min-h-screen bg-gray-200">
      <div class="p-6 font-sans">
        <!-- Top Section -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 class="text-2xl font-bold mb-4 md:mb-0">Contacts</h2>
          <div class="flex flex-col md:flex-row gap-3">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for..."
              class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-gray-400"
            />
            <button
              @click="resetSearch"
              class="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Reset Search
            </button>
             <router-link to="/contacts/add"
              class="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              New Contact
        </router-link>
          </div>
        </div>
  
        <!-- Alphabet Filter -->
        <div class="flex flex-wrap gap-2 mb-8 custom-scrollbar">
          <span
            v-for="letter in alphabet"
            :key="letter"
            @click="filterByLetter(letter)"
            :class="[
              'cursor-pointer text-sm px-2 py-1 rounded',
              activeLetter === letter ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ letter }}
          </span>
          <span
            @click="filterByLetter('All')"
            :class="[
              'cursor-pointer text-sm px-2 py-1 rounded',
              activeLetter === 'All' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            All
          </span>
        </div>
  
        <!-- Contact Listing -->
<!-- Contact Listing -->
<div class="custom-scrollbar">
  <!-- If "All", show flat cards -->
  <div class="grid md:grid-cols-3 gap-6" v-if="activeLetter === 'All'">
    <div
      v-for="contact in filteredContacts"
      :key="contact.id"
      class="bg-white rounded-lg p-4"
    >
      <p class="font-semibold">{{ contact.name }}</p>
      <p class="text-gray-500">{{ contact.company }}</p>
      <p class="text-gray-500 mb-2">{{ contact.email }}</p>
      <div class="text-black underline flex gap-2 text-xs">
        <a href="#" class="hover:underline">vCard</a>
        <span>|</span>
        <a href="#" class="hover:underline">Edit</a>
      </div>
    </div>
  </div>

  <!-- Grouped by letter layout -->
  <div v-else>
    <div
      v-for="(group, letter) in filteredGroupedContacts"
      :key="letter"
      class="mb-8"
    >
      <h3 class="text-lg font-semibold text-black mb-4">{{ letter }}</h3>
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="contact in group"
          :key="contact.id"
          class="bg-white rounded-lg p-4"
        >
          <p class="font-semibold">{{ contact.name }}</p>
          <p class="text-gray-500">{{ contact.company }}</p>
          <p class="text-gray-500 mb-2">{{ contact.email }}</p>
          <div class="text-black underline flex gap-2 text-xs">
            <a href="#" class="hover:underline">vCard</a>
            <span>|</span>
            <a href="#" class="hover:underline">Edit</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


      </div>
    </div>
  </template>
  

  <script setup>
import { ref, computed, onMounted } from 'vue';

const contacts = ref([]);
const searchQuery = ref('');
const activeLetter = ref('All');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Fetch contacts from API
const fetchContacts = async () => {
  try {
    const res = await fetch("https://dp7.wetechnoids.com/api/contacts");
    const data = await res.json();

    // Transform API data to match your display logic
    contacts.value = data.map((contact) => ({
      id: contact.contact_id,
      name: `${contact.contact_first_name} ${contact.contact_last_name}`.trim(),
      company: contact.contact_company,
      email: contact.contact_email,
    }));
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
  }
};

onMounted(fetchContacts);

// Filter contacts
const filteredContacts = computed(() => {
  let filtered = contacts.value;
  if (searchQuery.value.trim()) {
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  }
  if (activeLetter.value !== 'All') {
    filtered = filtered.filter(c => c.name.charAt(0).toUpperCase() === activeLetter.value);
  }
  return filtered;
});

// Group contacts by first letter
const groupedContacts = computed(() => {
  const groups = {};
  alphabet.forEach(letter => {
    groups[letter] = [];
  });

  filteredContacts.value.forEach(contact => {
    const firstLetter = contact.name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) groups[firstLetter] = [];
    groups[firstLetter].push(contact);
  });

  return groups;
});

// Only include groups with contacts
const filteredGroupedContacts = computed(() => {
  const result = {};
  Object.entries(groupedContacts.value).forEach(([letter, group]) => {
    if (group.length > 0) {
      result[letter] = group;
    }
  });
  return result;
});

function resetSearch() {
  searchQuery.value = '';
  activeLetter.value = 'All';
}

function filterByLetter(letter) {
  activeLetter.value = letter;
}
</script>

  <!-- <script setup>
  import { ref, reactive, computed } from 'vue';
  
  const contacts = reactive([
    { id: 1, name: 'Admin Person', company: '', email: 'info@paulboivin.com' },
    { id: 2, name: 'Audra Locicero', company: 'Blink Tech', email: 'audra@blink-tech.com' },
    { id: 3, name: 'Alexis Alias', company: 'Blink Tech', email: 'alexis@blink-tech.com' },
    { id: 4, name: 'Wojciech Abucewicz', company: 'Blink Tech', email: 'wojciech@blink-tech.com' },
    { id: 5, name: 'Amy Gray', company: 'Blink Tech', email: 'amy@blink-tech.com' },
    { id: 6, name: 'April Doner', company: 'Blink Tech', email: 'april@blink-tech.com' },
    { id: 7, name: 'Aurora Rosenberger', company: 'Blink Tech', email: 'immafox2@gmail.com' },
    { id: 8, name: 'Albert Stepanyan', company: 'Blink Tech', email: 'albert@blink-tech.com' },
    { id: 9, name: 'Alexis Orgera', company: 'Blink Tech', email: 'alexis@blink-tech.com' },
    { id: 10, name: 'Alicia Brown', company: '', email: 'birksmansion@gmail.com' },
    { id: 11, name: 'Aatif Hussain', company: 'Blink Tech', email: 'info@blink-tech.com' },
  ]);
  
  const searchQuery = ref('');
  const activeLetter = ref('All');
  
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const filteredContacts = computed(() => {
    let filtered = contacts;
    if (searchQuery.value.trim()) {
      filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
    if (activeLetter.value !== 'All') {
      filtered = filtered.filter(c => c.name.charAt(0).toUpperCase() === activeLetter.value);
    }
    return filtered;
  });
  
  // Group contacts by first letter
  const groupedContacts = computed(() => {
    const groups = {};
    alphabet.forEach(letter => {
      groups[letter] = [];
    });
  
    filteredContacts.value.forEach(contact => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(contact);
    });
  
    return groups;
  });
  
  // Only return groups that have at least one contact
  const filteredGroupedContacts = computed(() => {
    const result = {};
    Object.entries(groupedContacts.value).forEach(([letter, group]) => {
      if (group.length > 0) {
        result[letter] = group;
      }
    });
    return result;
  });
  
  function resetSearch() {
    searchQuery.value = '';
    activeLetter.value = 'All';
  }
  
  function filterByLetter(letter) {
    activeLetter.value = letter;
  }
  
 
  </script> -->
  
  <style>
  .custom-scrollbar::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  .custom-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  </style>
  