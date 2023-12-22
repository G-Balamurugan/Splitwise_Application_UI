import { useApiTestStore } from '@/stores/api-store'
import BliButton from '@blibli/blue.button/dist/button/blue/Button'
import { storeToRefs } from 'pinia'

export default {
  components: {
    BliButton
  },
  setup () {
    const apiTestStore = useApiTestStore()

    const { text, postText, texts } = storeToRefs(apiTestStore)

    async function getTextAPI () {
      await apiTestStore.getTextData({ query: { queryTest: ['TEST-123', 'TEST-345'] } })
    }

    async function postTextAPI () {
      const test = {
        id: 'Test123',
        data: {
          text: 'Doing some Test',
          list: [
            'this is data1',
            'this is data2',
            'this is data3'
          ]
        }
      }

      await apiTestStore.postTextData(test)
    }
    return {
      getTextAPI,
      postTextAPI,
      text,
      postText,
      texts
    }
  }
}
