'use client'

import EditorImage from "./editorImage"
import EditorToImg from "./editorToImg"
import { useI18n } from '@/app/i18n'

const EditorPreview = () => {
  const { t } = useI18n()
  return (
    <div className='h-full w-full bg-gray-50 flex flex-col overflow-hidden'>
      <h2 className='text-lg font-bold text-center py-4 shrink-0'>{t('editor.previewTitle')}</h2>
      <div className='flex-1 w-full min-h-0 overflow-auto flex justify-center items-center p-4'>
        <EditorToImg>
          <EditorImage />
        </EditorToImg>
      </div>
    </div>
  )
}

export default EditorPreview
