<template>
  <div class="min-h-screen from-sky-100 to-white flex items-center justify-center py-10 px-4">
    <!-- Modern Popup Notification -->
    <transition name="slide-fade">
      <div
        v-if="showPopup"
        :class="[
          'fixed top-4 left-1/2 transform -translate-x-1/2 flex items-start p-4 rounded-xl shadow-lg z-50 max-w-md w-full',
          successMessage ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'
        ]"
      >
        <div :class="[
          'flex-shrink-0 p-2 rounded-lg',
          successMessage ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
        ]">
          <svg v-if="successMessage" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <div class="ml-3">
          <h3 :class="[
            'text-sm font-medium',
            successMessage ? 'text-emerald-800' : 'text-rose-800'
          ]">
            {{ successMessage ? 'Success!' : 'Error' }}
          </h3>
          <div :class="[
            'mt-1 text-sm',
            successMessage ? 'text-emerald-700' : 'text-rose-700'
          ]">
            <p>{{ successMessage || errorMessage }}</p>
          </div>
        </div>
        <button 
          @click="showPopup = false"
          :class="[
            'ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg inline-flex items-center justify-center h-8 w-8',
            successMessage ? 'text-emerald-500 hover:bg-emerald-100' : 'text-rose-500 hover:bg-rose-100'
          ]"
        >
          <span class="sr-only">Close</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </transition>

    <div class="bg-white shadow-2xl rounded-2xl w-full max-w-4xl p-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold flex items-center">
          <img src="@/assets/handshake.png" alt="Company Icon" class="w-6 h-6 mr-2" />
          Add Contact
        </h2>
        <router-link to="/contacts" class="text-blue-500 hover:underline">Back to Contacts</router-link>
      </div>

      <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- Row 1 -->
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input v-model="form.firstName" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input v-model="form.lastName" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <!-- Row 2 -->
        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
          <input v-model="form.displayName" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div class="md:col-span-2">
          <div class="flex flex-col md:flex-row gap-5">
            <div class="flex-1 flex flex-col">
              <label class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input v-model="form.jobTitle" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
            </div>

            <div class="flex-1 flex flex-col">
              <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input v-model="form.title" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
            </div>

            <div class="flex items-center gap-2 pt-6">
              <input type="checkbox" v-model="form.privateEntry" class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
              <label class="text-gray-700 text-sm">Private Entry</label>
            </div>
          </div>
        </div>

        <!-- Row 5 -->
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <select v-model="form.company" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
            <option disabled value="">Select Company</option>
            <option v-for="company in companies" :key="company.company_id" :value="company.company_id">
              {{ company.company_name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select v-model="form.department" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
            <option disabled value="">Select Department</option>
            <option v-for="dept in departments" :key="dept.dept_id" :value="dept.dept_id">
              {{ dept.dept_name }}
            </option>
          </select>
        </div>

        <!-- Rest of the form remains the same -->
        <!-- Row 6 -->
        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <input v-model="form.type" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <!-- Address -->
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Address 1</label>
          <input v-model="form.address1" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Address 2</label>
          <input v-model="form.address2" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input v-model="form.city" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input v-model="form.state" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <!-- Postcode / Zip -->
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Postcode / Zip</label>
          <input
            type="number"
            v-model.number="form.postcode"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            min="0"
            step="1"
            inputmode="numeric"
            pattern="[0-9]*"
            placeholder="Enter numeric zip code"
          />
        </div>

        <!-- Contact Numbers -->
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone 1</label>
          <input v-model="form.phone1" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone 2</label>
          <input v-model="form.phone2" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Fax</label>
          <input v-model="form.fax" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Mobile Phone</label>
          <input v-model="form.mobilePhone" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <!-- Email -->
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email 1</label>
          <input v-model="form.email1" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email 2</label>
          <input v-model="form.email2" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Website / URL</label>
          <input v-model="form.url" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <!-- Chat Fields -->
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Jabber</label>
          <input v-model="form.jabber" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">ICQ</label>
          <input v-model="form.icq" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">AOL</label>
          <input v-model="form.aol" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">MSN</label>
          <input v-model="form.msn" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Yahoo</label>
          <input v-model="form.yahoo" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
          <input type="date" v-model="form.birthday" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <!-- Notes at the bottom -->
        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Contact Notes</label>
          <textarea rows="4" v-model="form.notes" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"></textarea>
        </div>

        <!-- Buttons -->
        <div class="md:col-span-2 flex justify-between mt-6">
          <button type="submit" class="px-6 py-2 text-sm bg-black text-white hover:bg-black rounded shadow">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const companies = ref([]);
    const departments = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
    
    const successMessage = ref('');
    const errorMessage = ref('');
    const showPopup = ref(false);

    const form = ref({
      firstName: '', lastName: '', displayName: '', privateEntry: false,
      jobTitle: '', company: '', department: '', title: '', type: '',
      address1: '', address2: '', city: '', state: '', postcode: '',
      phone1: '', phone2: '', fax: '', mobilePhone: '',
      email1: '', email2: '', url: '', jabber: '', icq: '',
      aol: '', msn: '', yahoo: '', birthday: '', notes: ''
    });

    const fetchCompanies = async () => {
      isLoading.value = true;
      error.value = null;

      try {
        const response = await fetch('https://dp7.wetechnoids.com/api/project-company');
        const result = await response.json();

        companies.value = result
          .filter(c => c.company_name)
          .map(c => ({ company_id: c.project_company, company_name: c.company_name }))
          .sort((a, b) => a.company_name.localeCompare(b.company_name));
      } catch (err) {
        error.value = `Companies: ${err.message}`;
        companies.value = [];
      } finally {
        isLoading.value = false;
      }
    };

    const fetchDepartments = async () => {
      try {
        const res = await fetch('https://dp7.wetechnoids.com/api/departments');
        const data = await res.json();

        departments.value = data
          .filter(d => d.dept_name)
          .map(d => ({ dept_id: d.dept_id, dept_name: d.dept_name }))
          .sort((a, b) => a.dept_name.localeCompare(b.dept_name));
      } catch (err) {
        error.value = 'Departments: ' + err.message;
        departments.value = [];
      }
    };

    onMounted(async () => {
      await Promise.all([fetchCompanies(), fetchDepartments()]);
    });

    const handleSubmit = async () => {
      const postcodeValue = Number.isNaN(form.value.postcode) ? null : form.value.postcode;
      const payload = {
        contact_first_name: form.value.firstName || null,
        contact_last_name: form.value.lastName || null,
        contact_order_by: form.value.displayName || null,
        contact_title: form.value.title || null,
        contact_birthday: form.value.birthday || null,
        contact_job: form.value.jobTitle || null,
        contact_company: form.value.company || "0",
        contact_department: form.value.department || "",
        contact_type: form.value.type || null,
        contact_email: form.value.email1 || null,
        contact_email2: form.value.email2 || null,
        contact_url: form.value.url || null,
        contact_phone: form.value.phone1 || null,
        contact_phone2: form.value.phone2 || null,
        contact_fax: form.value.fax || null,
        contact_mobile: form.value.mobilePhone || null,
        contact_address1: form.value.address1 || null,
        contact_address2: form.value.address2 || null,
        contact_city: form.value.city || null,
        contact_state: form.value.state || null,
        contact_zip: postcodeValue || null,
        contact_country: null,
        contact_jabber: form.value.jabber || null,
        contact_icq: form.value.icq || null,
        contact_msn: form.value.msn || null,
        contact_yahoo: form.value.yahoo || null,
        contact_aol: form.value.aol || null,
        contact_notes: form.value.notes || null,
        contact_project: 0,
        contact_icon: "obj/contact",
        contact_owner: 0,
        contact_private: form.value.privateEntry ? 1 : 0
      };

      try {
        const res = await fetch('https://dp7.wetechnoids.com/api/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await res.json();

        successMessage.value = 'Contact added successfully!';
        errorMessage.value = '';
        showPopup.value = true;
        
        // Hide popup automatically after 4 seconds
        setTimeout(() => {
          showPopup.value = false;
          // Redirect after popup hides
          router.push('/contacts');
        }, 4000);
      } catch (err) {
        console.error('Submission failed:', err);
        errorMessage.value = err.message || 'Failed to add contact. Please try again.';
        successMessage.value = '';
        showPopup.value = true;
        
        // Hide popup automatically after 4 seconds
        setTimeout(() => {
          showPopup.value = false;
        }, 4000);
      }
    };

    return {
      form,
      companies,
      departments,
      handleSubmit,
      isLoading,
      error,
      successMessage,
      errorMessage,
      showPopup,
    };
  }
};
</script>

<style scoped>
/* Slide-fade animation for the popup */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-50%) translateY(-10px);
  opacity: 0;
}
</style>









<!-- <template>
  <div class="min-h-screen from-sky-100 to-white flex items-center justify-center py-10 px-4">

<div
      v-if="showPopup"
      :class="[
        'fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white z-50 transition-opacity duration-300',
        successMessage ? 'bg-green-600' : 'bg-red-600'
      ]"
    >
      <p>{{ successMessage || errorMessage }}</p>
    </div>
    <div class="bg-white shadow-2xl rounded-2xl w-full max-w-4xl p-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold flex items-center">
          <img src="@/assets/handshake.png" alt="Company Icon" class="w-6 h-6 mr-2" />
          Add Contact
        </h2>
        <router-link to="/contacts" class="text-blue-500 hover:underline">Back to Contacts</router-link>
      </div>

      <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input v-model="form.firstName" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input v-model="form.lastName" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
          <input v-model="form.displayName" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div class="md:col-span-2">
          <div class="flex flex-col md:flex-row gap-5">
            <div class="flex-1 flex flex-col">
              <label class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input v-model="form.jobTitle" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
            </div>

            <div class="flex-1 flex flex-col">
              <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input v-model="form.title" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
            </div>

            <div class="flex items-center gap-2 pt-6">
              <input type="checkbox" v-model="form.privateEntry" class="h-4 w-4" />
              <label class="text-gray-700 text-sm">Private Entry</label>
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <select v-model="form.company" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
            <option disabled value="">Select Company</option>
            <option v-for="company in companies" :key="company.company_id" :value="company.company_id">
              {{ company.company_name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select v-model="form.department" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
            <option disabled value="">Select Department</option>
            <option v-for="dept in departments" :key="dept.dept_id" :value="dept.dept_id">
              {{ dept.dept_name }}
            </option>
          </select>
        </div>

        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <input v-model="form.type" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Address 1</label>
          <input v-model="form.address1" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Address 2</label>
          <input v-model="form.address2" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input v-model="form.city" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input v-model="form.state" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
<div class="flex flex-col">
  <label class="block text-sm font-medium text-gray-700 mb-1">Postcode / Zip</label>
  <input
    type="number"
    v-model.number="form.postcode"
    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
    min="0"
    step="1"
    inputmode="numeric"
    pattern="[0-9]*"
    placeholder="Enter numeric zip code"
  />
</div>


        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone 1</label>
          <input v-model="form.phone1" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone 2</label>
          <input v-model="form.phone2" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Fax</label>
          <input v-model="form.fax" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Mobile Phone</label>
          <input v-model="form.mobilePhone" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email 1</label>
          <input v-model="form.email1" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email 2</label>
          <input v-model="form.email2" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Website / URL</label>
          <input v-model="form.url" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Jabber</label>
          <input v-model="form.jabber" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">ICQ</label>
          <input v-model="form.icq" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">AOL</label>
          <input v-model="form.aol" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">MSN</label>
          <input v-model="form.msn" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div class="flex flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Yahoo</label>
          <input v-model="form.yahoo" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
          <input type="date" v-model="form.birthday" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div class="flex flex-col md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Contact Notes</label>
          <textarea rows="4" v-model="form.notes" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"></textarea>
        </div>

        <div class="md:col-span-2 flex justify-between mt-6">
          <button type="submit" class="px-6 py-2 text-sm bg-black text-white hover:bg-black rounded shadow">Submit</button>
        </div>
      </form>
    </div>
    
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const successMessage = ref('');
const errorMessage = ref('');
const showPopup = ref(false);


export default {
  
  setup() {
    const router = useRouter();
    const companies = ref([]);
    const departments = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    const form = ref({
      firstName: '', lastName: '', displayName: '', privateEntry: false,
      jobTitle: '', company: '', department: '', title: '', type: '',
      address1: '', address2: '', city: '', state: '', postcode: '',
      phone1: '', phone2: '', fax: '', mobilePhone: '',
      email1: '', email2: '', url: '', jabber: '', icq: '',
      aol: '', msn: '', yahoo: '', birthday: '', notes: ''
    });

    const fetchCompanies = async () => {
      isLoading.value = true;
      error.value = null;

      try {
        const response = await fetch('https://dp7.wetechnoids.com/api/project-company');
        const result = await response.json();

        companies.value = result
          .filter(c => c.company_name)
          .map(c => ({ company_id: c.project_company, company_name: c.company_name }))
          .sort((a, b) => a.company_name.localeCompare(b.company_name));
      } catch (err) {
        error.value = `Companies: ${err.message}`;
        companies.value = [];
      } finally {
        isLoading.value = false;
      }
    };

    const fetchDepartments = async () => {
      try {
        const res = await fetch('https://dp7.wetechnoids.com/api/departments');
        const data = await res.json();

        departments.value = data
          .filter(d => d.dept_name)
          .map(d => ({ dept_id: d.dept_id, dept_name: d.dept_name }))
          .sort((a, b) => a.dept_name.localeCompare(b.dept_name));
      } catch (err) {
        error.value = 'Departments: ' + err.message;
        departments.value = [];
      }
    };

    onMounted(async () => {
      await Promise.all([fetchCompanies(), fetchDepartments()]);
    });

    const handleSubmit = async () => {
      const postcodeValue = Number.isNaN(form.value.postcode) ? null : form.value.postcode;
      const payload = {
        contact_first_name: form.value.firstName || null,
        contact_last_name: form.value.lastName || null,
        contact_order_by: form.value.displayName || null,
        contact_title: form.value.title || null,
        contact_birthday: form.value.birthday || null,
        contact_job: form.value.jobTitle || null,
        contact_company: form.value.company || "0",
        contact_department: form.value.department || "",
        contact_type: form.value.type || null,
        contact_email: form.value.email1 || null,
        contact_email2: form.value.email2 || null,
        contact_url: form.value.url || null,
        contact_phone: form.value.phone1 || null,
        contact_phone2: form.value.phone2 || null,
        contact_fax: form.value.fax || null,
        contact_mobile: form.value.mobilePhone || null,
        contact_address1: form.value.address1 || null,
        contact_address2: form.value.address2 || null,
        contact_city: form.value.city || null,
        contact_state: form.value.state || null,
        contact_zip: postcodeValue || null,
        contact_country: null,
        contact_jabber: form.value.jabber || null,
        contact_icq: form.value.icq || null,
        contact_msn: form.value.msn || null,
        contact_yahoo: form.value.yahoo || null,
        contact_aol: form.value.aol || null,
        contact_notes: form.value.notes || null,
        contact_project: 0,
        contact_icon: "obj/contact",
        contact_owner: 0,
        contact_private: form.value.privateEntry ? 1 : 0
      };

      try {
        const res = await fetch('https://dp7.wetechnoids.com/api/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });


        const result = await res.json();

        successMessage.value = 'Contact added successfully!';
        errorMessage.value = '';
        showPopup.value = true;
        console.log('Contact submitted successfully:', result);
           // Redirect after short delay so user can see success message
           setTimeout(() => {
          router.push('/contacts');
        }, 1500);
      } catch (err) {
        console.error('Submission failed:', err);
        errorMessage.value = err.message || 'An error occurred';
    successMessage.value = '';
    showPopup.value = true;
      }
      // Hide popup automatically after 3 seconds
  setTimeout(() => {
    showPopup.value = false;
  }, 3000);
    };

    return {
      form,
      companies,
      departments,
      handleSubmit,
      isLoading,
      error,
      successMessage,
      errorMessage,
      showPopup,
    };
  }
};
</script> -->

<!-- <script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const companies = ref([]);
    const departments = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    const form = ref({
      firstName: '', lastName: '', displayName: '', privateEntry: false,
      jobTitle: '', company: '', department: '', title: '', type: '',
      address1: '', address2: '', city: '', state: '', postcode: '',
      phone1: '', phone2: '', fax: '', mobilePhone: '',
      email1: '', email2: '', url: '', jabber: '', icq: '',
      aol: '', msn: '', yahoo: '', birthday: '', notes: ''
    });

    const fetchCompanies = async () => {
      isLoading.value = true;
      error.value = null;

      try {
        const response = await fetch('https://dp7.wetechnoids.com/api/project-company');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (!Array.isArray(result)) {
          throw new Error('Unexpected response format: expected an array');
        }

        companies.value = result
          .filter(c => c.company_name)
          .map(c => ({ company_id: c.project_company, company_name: c.company_name }))
          .sort((a, b) => a.company_name.localeCompare(b.company_name));
      } catch (err) {
        console.error('Error fetching companies:', err);
        error.value = `Companies: ${err.message}`;
        companies.value = [];
      } finally {
        isLoading.value = false;
      }
    };

    const fetchDepartments = async () => {
      try {
        const res = await fetch('https://dp7.wetechnoids.com/api/departments');
        const data = await res.json();
        
        departments.value = data
          .filter(d => d.dept_name)
          .map(d => ({ dept_id: d.dept_id, dept_name: d.dept_name }))
          .sort((a, b) => a.dept_name.localeCompare(b.dept_name));
      } catch (err) {
        error.value = 'Departments: ' + err.message;
        departments.value = [];
      }
    };

    onMounted(async () => {
      await Promise.all([fetchCompanies(), fetchDepartments()]);
    });

    const handleSubmit = () => {
      console.log('Submitted Form:', form.value);
    };

    return {
      form,
      companies,
      departments,
      handleSubmit,
      isLoading,
      error
    };
  }
};
</script> -->









<!-- <template>
    <div class="min-h-screen  from-sky-100 to-white flex items-center justify-center py-10 px-4">
      <div class="bg-white shadow-2xl rounded-2xl w-full max-w-4xl p-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold flex items-center">
            <img src="@/assets/handshake.png" alt="Company Icon" class="w-6 h-6 mr-2" />
            Add Contact
          </h2>
          <router-link to="/contacts" class="text-blue-500 hover:underline">Back to Contacts</router-link>
        </div>
  
        <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input v-model="form.firstName" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input v-model="form.lastName" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
  
          <div class="flex flex-col md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
            <input v-model="form.displayName" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
  
          <div class="md:col-span-2">
  <div class="flex flex-col md:flex-row gap-5">
    <div class="flex-1 flex flex-col">
      <label class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
      <input v-model="form.jobTitle" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
    </div>

    <div class="flex-1 flex flex-col">
      <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
      <input v-model="form.title" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
    </div>

    <div class="flex items-center gap-2 pt-6">
      <input type="checkbox" v-model="form.privateEntry" class="h-4 w-4" />
      <label class="text-gray-700 text-sm">Private Entry</label>
    </div>
  </div>
</div>
  
    
  
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <select v-model="form.company" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
              <option disabled value="">Select Company</option>
              <option>ABC Corp</option>
              <option>XYZ Ltd</option>
              <option>Global Tech</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select v-model="form.department" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
              <option disabled value="">Select Department</option>
              <option>HR</option>
              <option>Engineering</option>
              <option>Sales</option>
            </select>
          </div>
  

          <div class="flex flex-col md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <input v-model="form.type" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">Address 1</label>
            <input v-model="form.address1" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">Address 2</label>
            <input v-model="form.address2" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div class="flex flex-col md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input v-model="form.city" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input v-model="form.state" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">Postcode / Zip</label>
            <input v-model="form.postcode" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
  
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone 1</label>
            <input v-model="form.phone1" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone 2</label>
            <input v-model="form.phone2" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div class="flex flex-col md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Fax</label>
            <input v-model="form.fax" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div class="flex flex-col md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Mobile Phone</label>
            <input v-model="form.mobilePhone" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">Email 1</label>
            <input v-model="form.email1" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">Email 2</label>
            <input v-model="form.email2" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div class="flex flex-col md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Website / URL</label>
            <input v-model="form.url" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
  
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">Jabber</label>
            <input v-model="form.jabber" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">ICQ</label>
            <input v-model="form.icq" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div class="flex flex-col md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">AOL</label>
            <input v-model="form.aol" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">MSN</label>
            <input v-model="form.msn" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">Yahoo</label>
            <input v-model="form.yahoo" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
  
          <div class="flex flex-col md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
            <input type="date" v-model="form.birthday" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div class="flex flex-col md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Contact Notes</label>
            <textarea rows="4" v-model="form.notes" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"></textarea>
          </div>

          <div class="md:col-span-2 flex justify-between mt-6">

            <button type="submit" class="px-6 py-2 text-sm bg-black text-white hover:bg-black rounded shadow">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          firstName: '', lastName: '', displayName: '', privateEntry: false,
          jobTitle: '', company: '', department: '', title: '', type: '',
          address1: '', address2: '', city: '', state: '', postcode: '',
          phone1: '', phone2: '', fax: '', mobilePhone: '',
          email1: '', email2: '', url: '', jabber: '', icq: '',
          aol: '', msn: '', yahoo: '', birthday: '', notes: ''
        }
      };
    },
    methods: {
      handleSubmit() {
        console.log('Submitted Form:', this.form);
      },
      goBack() {
        window.history.back();
      }
    }
  };
  </script>
  

   -->