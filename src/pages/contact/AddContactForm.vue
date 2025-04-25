<template>
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
      <input type="checkbox" v-model="form.privateEntry" class="h-4 w-4" />
      <label class="text-gray-700 text-sm">Private Entry</label>
    </div>
  </div>
</div>
  
    
  
          <!-- Row 5 -->
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
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1">Postcode / Zip</label>
            <input v-model="form.postcode" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
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
  

  