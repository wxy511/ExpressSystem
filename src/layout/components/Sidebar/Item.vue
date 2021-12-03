<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon', 'sub-el-icon-ly']} />)
      } else {
        vnodes.push(<svg-icon class='sub-el-icon-ly' icon-class={icon}/>)
      }
    }

    if (title) {
      vnodes.push(<span slot='title' class='el-title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
/* .sub-el-icon {
  color: currentColor;
  width: 1rem;
  height: 1rem;
}
.sub-el-icon-ly {
  width: 1.2rem;
  height: 1.2rem;
  font-size: 1.2rem;
} */
.el-title
{
  font-size: 1rem;padding-left: 10px;
  width: 100%;
}
</style>
