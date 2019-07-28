<template>
  <!-- (Optional) The Header -->
  <q-header elevated>
    <q-toolbar>
      <q-btn flat round dense icon="menu" @click="leftDrawer = !leftDrawer" />
      <q-toolbar-title>
        Header
      </q-toolbar-title>
      <q-tabs>
        <q-route-tab icon="map" to="/user" replace label="One Tab" />
        <q-route-tab icon="assignment" to="/some/other/route" replace label="Other Tab" />
      </q-tabs>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: 'HeaderLayout',
  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>
