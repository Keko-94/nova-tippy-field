<template>
  <panel-item :index="index" :field="field">
    <template #value>
      <excerpt
        :content="field.tipContent"
        :plain-text="true"
        :should-show="field.shouldShow"
      />
    </template>
  </panel-item>
</template>

<script>
export default {
  props: ['index', 'resource', 'resourceName', 'resourceId', 'field'],
}
</script>
