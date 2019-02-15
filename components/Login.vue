<template>
     <mu-container class="button-wrapper">
      <mu-button color="primary">Primary</mu-button>
      <mu-button color="secondary">Secondary</mu-button>
      <mu-button color="success">Success</mu-button>
      <mu-button color="warning">Warning</mu-button>
      <mu-button color="info">Info</mu-button>
      <mu-button color="error">Error</mu-button>
      <mu-button disabled>disabled</mu-button>
    </mu-container>
</template>

<style scoped>
.button-wrapper {
  text-align: center;

}
.button-wrapper .mu-button{
    margin: 8px;
  }
</style>
