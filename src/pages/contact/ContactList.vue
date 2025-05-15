```vue
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
          <router-link
            to="/contacts/add"
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
              <button
                @click="showVCardModal(contact)"
                class="hover:underline focus:outline-none"
              >
                vCard
              </button>
              <span>|</span>
              <router-link
                :to="{ path: '/contacts/add', query: { id: contact.id } }"
                class="hover:underline"
              >
                Edit
              </router-link>
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
                  <button
                    @click="showVCardModal(contact)"
                    class="hover:underline focus:outline-none"
                  >
                    vCard
                  </button>
                  <span>|</span>
                  <router-link
                    :to="{ path: '/contacts/add', query: { id: contact.id } }"
                    class="hover:underline"
                  >
                    Edit
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- vCard Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="closeVCardModal"
      >
        <div class="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold">Contact Details</h3>
            <button
              @click="closeVCardModal"
              class="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div v-if="selectedContact" class="text-sm space-y-2">
            <p><strong>Full Name:</strong> {{ selectedContact.name }}</p>
            <p v-if="selectedContact.title"><strong>Title:</strong> {{ selectedContact.title }}</p>
            <p v-if="selectedContact.jobTitle"><strong>Job Title:</strong> {{ selectedContact.jobTitle }}</p>
            <p v-if="selectedContact.company"><strong>Company:</strong> {{ selectedContact.company }}</p>
            <p v-if="selectedContact.department"><strong>Department:</strong> {{ selectedContact.department }}</p>
            <p v-if="selectedContact.email1"><strong>Email:</strong> {{ selectedContact.email1 }}</p>
            <p v-if="selectedContact.email2"><strong>Secondary Email:</strong> {{ selectedContact.email2 }}</p>
            <p v-if="selectedContact.phone1"><strong>Phone:</strong> {{ selectedContact.phone1 }}</p>
            <p v-if="selectedContact.phone2"><strong>Secondary Phone:</strong> {{ selectedContact.phone2 }}</p>
            <p v-if="selectedContact.mobilePhone"><strong>Mobile:</strong> {{ selectedContact.mobilePhone }}</p>
            <p v-if="selectedContact.fax"><strong>Fax:</strong> {{ selectedContact.fax }}</p>
            <p v-if="selectedContact.address1 || selectedContact.address2 || selectedContact.city || selectedContact.state || selectedContact.postcode">
              <strong>Address:</strong>
              <span>
                {{ [selectedContact.address1, selectedContact.address2, selectedContact.city, selectedContact.state, selectedContact.postcode].filter(Boolean).join(', ') }}
              </span>
            </p>
            <p v-if="selectedContact.url"><strong>Website:</strong> <a :href="selectedContact.url" target="_blank" class="text-blue-500 hover:underline">{{ selectedContact.url }}</a></p>
            <p v-if="selectedContact.jabber"><strong>Jabber:</strong> {{ selectedContact.jabber }}</p>
            <p v-if="selectedContact.icq"><strong>ICQ:</strong> {{ selectedContact.icq }}</p>
            <p v-if="selectedContact.aol"><strong>AOL:</strong> {{ selectedContact.aol }}</p>
            <p v-if="selectedContact.msn"><strong>MSN:</strong> {{ selectedContact.msn }}</p>
            <p v-if="selectedContact.yahoo"><strong>Yahoo:</strong> {{ selectedContact.yahoo }}</p>
            <p v-if="selectedContact.birthday"><strong>Birthday:</strong> {{ selectedContact.birthday }}</p>
            <p v-if="selectedContact.notes"><strong>Notes:</strong> {{ selectedContact.notes }}</p>
            <p v-if="selectedContact.type"><strong>Type:</strong> {{ selectedContact.type }}</p>
            <p v-if="selectedContact.privateEntry"><strong>Private:</strong> {{ selectedContact.privateEntry ? 'Yes' : 'No' }}</p>
          </div>
          <div class="mt-6 flex justify-end">
            <button
              @click="downloadVCard"
              class="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-600 transition mr-2"
            >
              Download vCard
            </button>
            <button
              @click="closeVCardModal"
              class="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Close
            </button>
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
const showModal = ref(false);
const selectedContact = ref(null);

// Fetch contacts from API
const fetchContacts = async () => {
  try {
    const res = await fetch("https://dp7.wetechnoids.com/api/contacts");
    if (!res.ok) {
      throw new Error('Failed to fetch contacts');
    }
    const data = await res.json();

    contacts.value = data.map((contact) => ({
      id: contact.contact_id,
      firstName: contact.contact_first_name,
      lastName: contact.contact_last_name,
      name: `${contact.contact_first_name || ''} ${contact.contact_last_name || ''}`.trim(),
      company: contact.contact_company,
      email: contact.contact_email,
      jobTitle: contact.contact_job,
      title: contact.contact_title,
      phone1: contact.contact_phone,
      phone2: contact.contact_phone2,
      mobilePhone: contact.contact_mobile,
      fax: contact.contact_fax,
      address1: contact.contact_address1,
      address2: contact.contact_address2,
      city: contact.contact_city,
      state: contact.contact_state,
      postcode: contact.contact_zip,
      email1: contact.contact_email,
      email2: contact.contact_email2,
      url: contact.contact_url,
      jabber: contact.contact_jabber,
      icq: contact.contact_icq,
      aol: contact.contact_aol,
      msn: contact.contact_msn,
      yahoo: contact.contact_yahoo,
      birthday: contact.contact_birthday,
      notes: contact.contact_notes,
      privateEntry: contact.contact_private === 1,
      type: contact.contact_type,
      department: contact.contact_department
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

function showVCardModal(contact) {
  selectedContact.value = contact;
  showModal.value = true;
}

function closeVCardModal() {
  showModal.value = false;
  selectedContact.value = null;
}

function downloadVCard() {
  if (!selectedContact.value) return;

  const contact = selectedContact.value;
  const vCard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${contact.name}`,
    `N:${contact.lastName || ''};${contact.firstName || ''};;;`,
    contact.company ? `ORG:${contact.company}` : '',
    contact.jobTitle ? `TITLE:${contact.jobTitle}` : '',
    contact.email1 ? `EMAIL;TYPE=WORK:${contact.email1}` : '',
    contact.email2 ? `EMAIL;TYPE=HOME:${contact.email2}` : '',
    contact.phone1 ? `TEL;TYPE=WORK:${contact.phone1}` : '',
    contact.mobilePhone ? `TEL;TYPE=CELL:${contact.mobilePhone}` : '',
    contact.phone2 ? `TEL;TYPE=HOME:${contact.phone2}` : '',
    contact.fax ? `TEL;TYPE=FAX:${contact.fax}` : '',
    contact.address1 || contact.address2 || contact.city || contact.state || contact.postcode
      ? `ADR;TYPE=WORK:;;${contact.address1 || ''};${contact.city || ''};${contact.state || ''};${contact.postcode || ''};`
      : '',
    contact.url ? `URL:${contact.url}` : '',
    contact.birthday ? `BDAY:${contact.birthday}` : '',
    contact.notes ? `NOTE:${contact.notes}` : '',
    'END:VCARD'
  ]
    .filter(line => line)
    .join('\n');

  const blob = new Blob([vCard], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${contact.name || 'contact'}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
</script>

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
```




<!-- <template>
    <div class="min-h-screen bg-gray-200">
      <div class="p-6 font-sans">
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
  
<div class="custom-scrollbar">
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
        <router-link
            :to="{ path: '/contacts/add', query: { id: contact.id } }"
            class="hover:underline"
          >
            Edit
          </router-link>
      </div>
    </div>
  </div>

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
            <router-link
            :to="{ path: '/contacts/add', query: { id: contact.id } }"
            class="hover:underline"
          >
            Edit
          </router-link>
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
      firstName: contact.contact_first_name,
      lastName: contact.contact_last_name,
      name: `${contact.contact_first_name} ${contact.contact_last_name}`.trim(),
      company: contact.contact_company,
      email: contact.contact_email,
      // Add all other fields that exist in your form
      jobTitle: contact.contact_job,
      title: contact.contact_title,
      phone1: contact.contact_phone,
      phone2: contact.contact_phone2,
      mobilePhone: contact.contact_mobile,
      fax: contact.contact_fax,
      address1: contact.contact_address1,
      address2: contact.contact_address2,
      city: contact.contact_city,
      state: contact.contact_state,
      postcode: contact.contact_zip,
      email1: contact.contact_email,
      email2: contact.contact_email2,
      url: contact.contact_url,
      jabber: contact.contact_jabber,
      icq: contact.contact_icq,
      aol: contact.contact_aol,
      msn: contact.contact_msn,
      yahoo: contact.contact_yahoo,
      birthday: contact.contact_birthday,
      notes: contact.contact_notes,
      privateEntry: contact.contact_private === 1,
      type: contact.contact_type,
      department: contact.contact_department
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
   -->







  <!-- <script setup>
  import { ref, reactive, computed } from 'vue';
      // const res = await fetch("https://dp7.wetechnoids.com/api/contacts");
    // const data = await res.json();

    // // Transform API data to match your display logic
    // contacts.value = data.map((contact) => ({
    //   id: contact.contact_id,
    //   name: `${contact.contact_first_name} ${contact.contact_last_name}`.trim(),
    //   company: contact.contact_company,
    //   email: contact.contact_email,
    // }));
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