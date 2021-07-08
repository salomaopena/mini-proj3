<template>
  <!-- Portfolio Section -->
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Especialista" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve o nome"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="contact"
                type="text"
                class="form-control form-control-lg"
                id="txtContact"
                placeholder="escreve o contacto"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="address"
                type="text"
                class="form-control form-control-lg"
                id="txtAddress"
                placeholder="escreve o endereço"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="country"
                type="text"
                class="form-control form-control-lg"
                id="txtCountry"
                placeholder="escreve o país"
                required
              />
            </div>
            <div class="form-group">
              <select
                id="sltGroup"
                class="form-control form-control-lg"
                v-model="group"
                required
              >
                <option value>-- SELECIONA GRUPO --</option>
                <option value="anfibio">ANFÍBIO</option>
                <option value="ave">AVE</option>
                <option value="mamifero">MAMÍFERO</option>
                <option value="peixe">PEIXE</option>
                <option value="reptil">RÉPTIL</option>
              </select>
            </div>
            <div class="form-group">
              <textarea
                id="txtDescription"
                class="form-control form-control-lg"
                placeholder="escreve a descrição"
                cols="30"
                rows="5"
                v-model="description"
                required
              ></textarea>
            </div>

            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i> ADICIONAR
            </button>
            <router-link
              :to="{ name: 'listExperts' }"
              tag="button"
              class="btn btn-outline-danger btn-lg"
              ><i class="fas fa-window-close"></i> CANCELAR</router-link
            >
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>


<script>
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "AddExpert",
  components: {
    HeaderPage,
  },
  data: () => {
    return {
      name: "",
      contact: "",
      address: "",
      country: "",
      group: "",
      description: "",
    };
  },
  computed: {
    ...mapGetters("expert", ["getMessage"]),
  },
};
</script>
