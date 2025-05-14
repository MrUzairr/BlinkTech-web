<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold flex items-center">
          <img src="@/assets/handshake.png" alt="Company Icon" class="w-6 h-6 mr-2" />
          Add Company
        </h2>
        <router-link to="/companies" class="text-blue-500 hover:underline">Back to Companies</router-link>
      </div>

      <form @submit.prevent="submitCompany">
        <!-- Company Info -->
        <div class="mb-8">
          <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Companies list</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label class="block mb-1 font-medium">Company Name <span class="text-red-500">*</span></label>
              <input v-model="newCompany.name" type="text" required
                     class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
              <label class="block mb-1 font-medium">Email</label>
              <input v-model="newCompany.email" type="email"
                     class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
              <label class="block mb-1 font-medium">Phone</label>
              <input v-model="newCompany.phone" type="tel"
                     class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
              <label class="block mb-1 font-medium">Phone1</label>
              <input v-model="newCompany.phone1" type="tel"
                     class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
              <label class="block mb-1 font-medium">Fax</label>
              <input v-model="newCompany.fax" type="tel"
                     class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
          </div>
        </div>

        <!-- Address -->
        <div class="mb-8">
          <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Address</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label class="block mb-1 font-medium">Address</label>
              <input v-model="newCompany.address" type="text"
                     class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div class="md:col-span-2">
              <label class="block mb-1 font-medium">Address2</label>
              <input v-model="newCompany.address2" type="text"
                     class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
              <label class="block mb-1 font-medium">City</label>
              <input v-model="newCompany.city" type="text"
                     class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
              <label class="block mb-1 font-medium">State</label>
              <input v-model="newCompany.state" type="text"
                     class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
              <label class="block mb-1 font-medium">Zip</label>
              <input v-model="newCompany.zip" type="text" maxlength="10"
                     placeholder="e.g., 12345"
                     class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
              <label class="block mb-1 font-medium">URL</label>
              <input v-model="newCompany.url" type="url"
                     class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
          </div>
        </div>

        <!-- Owner -->
        <div class="mb-8">
          <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Company Owner</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 font-medium">Person, Admin</label>
              <input type="text" value="Admin User" disabled
                     class="w-full border px-3 py-2 rounded bg-gray-100">
            </div>
            <div>
              <label class="block mb-1 font-medium">Type</label>
              <select v-model="newCompany.type"
                      class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="0">Not Applicable</option>
                <option value="1">Client</option>
                <option value="2">Vendor</option>
                <option value="3">Supplier</option>
                <option value="4">Consultant</option>
                <option value="5">Government</option>
                <option value="6">Internal</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="mb-8">
          <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Description</h4>
          <textarea v-model="newCompany.description"
                    class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"></textarea>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-4 pt-4 border-t">
          <router-link to="/companies" class="px-6 py-2 border rounded-lg hover:bg-gray-50">
            Cancel
          </router-link>
          <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const newCompany = ref({
  name: '',
  email: '',
  phone: '',
  phone1: '',
  fax: '',
  address: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  url: '',
  type: 0,
  description: ''
});

const submitCompany = async () => {
  try {
    const payload = {
      company_module: 0,
      company_name: newCompany.value.name,
      company_phone1: newCompany.value.phone,
      company_phone2: newCompany.value.phone1,
      company_fax: newCompany.value.fax,
      company_address1: newCompany.value.address,
      company_address2: newCompany.value.address2,
      company_city: newCompany.value.city,
      company_state: newCompany.value.state,
      company_zip: newCompany.value.zip.trim().substring(0, 10),
      company_primary_url: newCompany.value.url,
      company_owner: 2, // Change to actual logged-in user ID if dynamic
      company_description: newCompany.value.description,
      company_type: parseInt(newCompany.value.type),
      company_email: newCompany.value.email,
      company_custom: null
    };

    await axios.post('https://dp7.wetechnoids.com/api/companies', payload);

    alert('Company added successfully!');
    router.push('/companies');
  } catch (error) {
    console.error('Error adding company:', error);
    alert('Failed to add company. Please check the input fields and try again.');
  }
};
</script>







<!-- <template>
    <div class="p-4 bg-gray-100 min-h-screen">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold flex items-center">
            <img src="@/assets/handshake.png" alt="Company Icon" class="w-6 h-6 mr-2" />
            Add Company
          </h2>
          <router-link to="/companies" class="text-blue-500 hover:underline">Back to Companies</router-link>
        </div>
        
        <form @submit.prevent="submitCompany">
          <div class="mb-8">
            <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Companies list</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block mb-1 font-medium">Company Name <span class="text-red-500">*</span></label>
                <input v-model="newCompany.name" type="text" required 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block mb-1 font-medium">Email</label>
                <input v-model="newCompany.email" type="email" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block mb-1 font-medium">Phone</label>
                <input v-model="newCompany.phone" type="tel" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block mb-1 font-medium">Phone1</label>
                <input v-model="newCompany.phone1" type="tel" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block mb-1 font-medium">Fax</label>
                <input v-model="newCompany.fax" type="tel" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
            </div>
          </div>
  
          <div class="mb-8">
            <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Address</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block mb-1 font-medium">Address</label>
                <input v-model="newCompany.address" type="text" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div class="md:col-span-2">
                <label class="block mb-1 font-medium">Address2</label>
                <input v-model="newCompany.address2" type="text" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block mb-1 font-medium">City</label>
                <input v-model="newCompany.city" type="text" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block mb-1 font-medium">State</label>
                <input v-model="newCompany.state" type="text" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block mb-1 font-medium">Zip</label>
                <input v-model="newCompany.zip" type="text" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block mb-1 font-medium">URL</label>
                <input v-model="newCompany.url" type="url" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
            </div>
          </div>
  
          <div class="mb-8">
            <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Company Owner</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 font-medium">Person, Admin</label>
                <input type="text" value="Admin User" disabled 
                       class="w-full border px-3 py-2 rounded bg-gray-100">
              </div>
              <div>
                <label class="block mb-1 font-medium">Type</label>
                <select v-model="newCompany.type" 
                        class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="Not Applicable">Not Applicable</option>
                  <option value="Client">Client</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Supplier">Supplier</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Government">Government</option>
                  <option value="Internal">Internal</option>
                </select>
              </div>
            </div>
          </div>
  
          <div class="mb-8">
            <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Description</h4>
            <textarea v-model="newCompany.description" 
                      class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"></textarea>
          </div>
  
          <div class="flex justify-end gap-4 pt-4 border-t">
            <router-link to="/companies" class="px-6 py-2 border rounded-lg hover:bg-gray-50">
              Cancel
            </router-link>
            <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useCompanyStore } from '@/stores/companyStore';
  
  const router = useRouter();
  const companyStore = useCompanyStore();
  
  const newCompany = ref({
    name: '',
    email: '',
    phone: '',
    phone1: '',
    fax: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    url: '',
    type: 'Not Applicable',
    description: ''
  });
  
  const submitCompany = () => {
    // Add the new company using the store
    companyStore.addCompany({
      name: newCompany.value.name,
      email: newCompany.value.email,
      phone: newCompany.value.phone,
      activeProjects: 0,
      archivedProjects: 0,
      type: newCompany.value.type
    });
    
    // Redirect back to companies list
    router.push('/companies');
  };
  </script> -->