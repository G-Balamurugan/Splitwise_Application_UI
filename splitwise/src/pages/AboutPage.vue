<template>
  <div class="about blu">
    <h1>This is an About page</h1>
    <div class="card">
        This is a standalone template project using Blue 3.
    </div>
    <a
      href="https://blue.blibli.com/blue3/"
      class="button-doc"
    >
      <BliButton
        prominence="secondary"
        size="small"
      >
        View Documentation
      </BliButton>
    </a>
  </div>
</template>

<script src="./js/about-page"></script>

<style lang="scss" scoped>
@import '@blibli/blue-design-tokens/dist/tokens-default.scss';

.about{
  min-height: 50vh;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  h1{
    font-size: 2.4em;
    color: $blu-color-neutral-text-inv;
  }
  .card{
    box-shadow: $blu-shadow-default;
    border-radius: 16px;
    background-color: white;
    padding: 1rem;
  }
  .button-doc{
    margin-top: 5%;
  }
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    justify-content: center;
  }
}
</style>
