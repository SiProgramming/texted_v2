# -*- mode: python ; coding: utf-8 -*-


block_cipher = None


a = Analysis(['index.py'],
             pathex=['D:\\Programming Projects\\Teams\\SiProgramming\\virtualenv\\texted_app'],
             binaries=[],
             datas=[('D:\\Programming Projects\\Teams\\SiProgramming\\virtualenv\\texted_app\\env\\lib\\site-packages\\eel\\eel.js', 'eel'), ('build', 'build')],
             hiddenimports=['bottle_websocket'],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          [],
          name='TextEd_consoled',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          upx_exclude=[],
          runtime_tmpdir=None,
          console=True , icon='logo.ico')