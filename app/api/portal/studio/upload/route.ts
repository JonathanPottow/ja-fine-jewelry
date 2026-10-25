import { NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { ownerEmail } from '@/lib/portal/owner'

export const dynamic = 'force-dynamic'

// Issues short-lived upload tokens so the studio can send renders straight to Vercel Blob.
export async function POST(req: Request) {
  const body = (await req.json()) as HandleUploadBody
  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        if (!ownerEmail()) throw new Error('Not signed in as the studio owner')
        if (!pathname.startsWith('cad/')) throw new Error('Bad path')
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
          maximumSizeInBytes: 40 * 1024 * 1024,
          addRandomSuffix: true,
        }
      },
    })
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 })
  }
}
