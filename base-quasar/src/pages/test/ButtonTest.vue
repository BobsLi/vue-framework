<template>
  <q-page padding>
    <div style="margin-top: 10px;">
      <q-btn color="primary" class="login-btn">主要按钮</q-btn>
    </div>
    <div style="margin-top: 10px;">
      <q-btn color="primary" class="login-btn btn-shadowed">主要按钮加弥散投影</q-btn>
    </div>
    <div style="margin-top: 10px;">
      <q-btn color="primary" outline class="login-btn">outline按钮</q-btn>
    </div>
    <div style="margin-top: 10px;">
      <q-btn color="primary" outline class="login-btn btn-shadowed">outline按钮加弥散投影</q-btn>
    </div>
    <div style="margin-top: 10px;">
      <q-btn color="secondary" class="login-btn">次要按钮</q-btn>
    </div>
    <div style="margin-top: 10px;">
      <q-btn color="primary" disabled class="login-btn">禁用按钮</q-btn>
    </div>
    <div style="margin-top: 10px;">
      <q-btn color="primary" class="btn-lg login-btn">大按钮</q-btn>
    </div>
    <div style="margin-top: 10px;">
      <q-btn color="primary" class="btn-xl login-btn">超大按钮</q-btn>
    </div>
    <div style="margin-top: 10px;">
      <q-btn color="primary" class="btn-sm login-btn">小按钮</q-btn>
    </div>
    <div style="margin-top: 10px;">
      <q-btn to="/start/pick-quasar-flavour" color="primary" class="login-btn">links</q-btn>
    </div>
    <div style="margin-top: 10px;">
      <q-btn type="a" href="/start/pick-quasar-flavour" color="primary" class="login-btn">links12</q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>

<style>

</style>
