<?php

use Phinx\Migration\AbstractMigration;

class <%= MigrateClassName %> extends AbstractMigration
{
    /**
     * Change Method.
     *
     * More information on this method is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-change-method
     *
     * Uncomment this method if you would like to use it.
     */


    /**
     * Migrate Up.
     */
    public function change()
    {
         $table = $this->table('<%= table_name %>');
                 $table<% _.each(attrs, function(attr){ %>->addColumn('<%= attr.name %>', '<%= attr.type %>', array('null'=> true, 'length' => <% if(attr.type == 'integer') { %>11<% }else{ %>255<% } %>,'default' => <% if(attr.type == 'integer') { %>0<% }else{ %>""<% } %>, "comment"=>""))
                    <% }) %>
                     ->addColumn('created', 'timestamp',array("comment"=>"创建时间", 'default'=>'CURRENT_TIMESTAMP'))
                     ->create();
    }

}