const { VertexAI } = require('@google-cloud/vertexai')

/**
 * TODO(developer): Update these variables before running the sample.
 */
async function generate_from_text_input(projectId = 'u-agent-fce30') {
  const vertexAI = new VertexAI({ project: projectId, location: 'us-central1' })

  const generativeModel = vertexAI.getGenerativeModel({
    model: 'gemini-2.5-flash-preview-04-17',
  })

  const prompt =
    "What's a good name for a flower shop that specializes in selling bouquets of dried flowers?"

  const resp = await generativeModel.generateContent(prompt)
  const contentResponse = await resp.response
  console.log(JSON.stringify(contentResponse))
}

// 调用函数
generate_from_text_input()
  .then(() => console.log('完成生成'))
  .catch(err => console.error('发生错误:', err))

// 导出函数供其他模块使用
module.exports = { generate_from_text_input }
