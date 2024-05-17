<script setup lang="ts">
defineProps<{
    image: string,
    name: string,
    currentRole: string,
    previousRole: string
}>();
</script>

<style>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    width: 150px;
}

.card img {
    width: 100px;
}

.card p,
.card h4,
.card span {
    margin: 0;
    text-align: center;
}

.card p {
    font-weight: 600;
    font-size: 1rem;
}

.card span {
    font-size: .9375rem;
    opacity: 0.8;
    font-weight: 600;
}
</style>

<template>
<div class="card">
    <img :src="image" />
    <h4>{{ name }}</h4>
    <p v-if="currentRole">{{ currentRole }}</p>
    <span v-if="previousRole">FA23 {{ previousRole  }}</span>
</div>
</template>