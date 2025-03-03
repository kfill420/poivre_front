<script setup>
import { ref, computed } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { useStore } from 'vuex';
import { getImageUrl } from './utils/utils';

const props = defineProps({
  id: Number,
  name: String,
  description: String,
  price: Array
});

const store = useStore();

const productRef = ref(null);
const imageRef = ref(null);
const selectedIndex = ref(0);
const weightSelect = ref(5);

const addCart = async (id, value, price) => {
  const decoded = jwtDecode(localStorage.getItem('token'));
  store.dispatch('cart/addToCart', { userId: decoded.userId, productId: id, quantity: value, price});
}

const options = [5, 10, 20];

const handleWeightChange = (e) => {
  selectedIndex.value = e.target.selectedIndex;
};

const handleSubmit = () => {
  const value = weightSelect.value;
  const logged = computed(() => store.state.auth.logged);
  if (logged.value) {
    addCart(props.id, value, props.price[selectedIndex.value]);
  } else {
    store.commit('auth/setLoginModalIsOpen', true);
  }
  
};

const zoomIn = () => {
  imageRef.value.classList.add('imageZoomed');
};

const zoomOut = () => {
  imageRef.value.classList.remove('imageZoomed');
};

</script>

<template>

  <div class="card flex is-clipped" ref="productRef" @mouseover="zoomIn" @mouseout="zoomOut">
    <div class="card-image">
      <figure class="image is-4by3" ref="imageRef">
        <img :src="getImageUrl(id)" alt="image de poivre">
      </figure>
    </div>
    <div class="card-content">
      <p class="title is-6 mb-2 has-text-weight-medium">{{ name }}</p>
      <p class="title is-7 mb-2 has-text-weight-normal">{{ description }}</p>
      <p class="title is-6 mb-2 has-text-weight-medium">{{ price[selectedIndex] }}€</p>
      <form @submit.prevent="handleSubmit">
        <select v-model="weightSelect" @change="handleWeightChange" class="select is-fullwidth mb-2">
          <option v-for="(option, index) in options" :key="index" :value=option>Poids - {{ option }}g</option>
        </select>
        <button type="submit" class="button is-primary is-fullwidth">Ajouter au panier</button>
      </form>
    </div>

  </div>
</template>

<style scoped>
.card {
  width: 19.2%;
  min-width: 180px;
  transition: transform 0.2s;
  cursor: pointer;
}

.image {
  transition: transform 0.2s;
}

.card-content {
  background-color: #EDEDED;
}

.imageZoomed {
  transform: scale(1.15);
}
</style>
