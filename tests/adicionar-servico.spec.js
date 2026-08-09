import { test, expect } from '@playwright/test';

test('adiciona um novo servico e ele aparece na lista', async ({ page, browserName, request }) => {
  const nomeServico = `Teste ${browserName} ${Date.now()}`

  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: '☰' }).click();
  await page.getByRole('button', { name: 'Adicionar' }).click();
  await page.getByRole('textbox', { name: 'Nome do Serviço' }).fill(nomeServico);
  await page.getByRole('textbox', { name: 'URL: https://exemplo.com/' }).fill('https://facebook.com/');
  await page.getByRole('spinbutton', { name: 'Intervalo em Minutos' }).fill('2');
  await page.getByRole('button', { name: 'ADICIONAR' }).click();
  await page.getByRole('button', { name: '☰' }).click();
  await page.getByRole('button', { name: 'Listar' }).click();

  await expect(page.getByRole('cell', { name: nomeServico })).toBeVisible();

  const resposta = await request.get('http://localhost:8000/servicos');
  const servicos = await resposta.json();
  const criado = servicos.find((s) => s.nome === nomeServico);
  
  await request.delete(`http://localhost:8000/servicos/${criado.id}`);
});